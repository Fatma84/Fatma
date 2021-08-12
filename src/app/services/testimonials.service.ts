import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { testimonial } from '../core/modals/add-testimonial/testimonial.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class TestimonialsService {
  testimonials = new BehaviorSubject<testimonial[]>([]);
  private testiCollection: AngularFirestoreCollection<testimonial>;

  constructor(
    private firestore: AngularFirestore,
    private usersService: UsersService
  ) {
    this.testiCollection = this.firestore.collection<testimonial>(
      'testimonial'
    );
    this.combineUsersWithTestimonials();
  }

  private combineUsersWithTestimonials() {
    let users = this.usersService.getUsers();
    let testimonials = this.getTestimonials();
    let res = combineLatest([users, testimonials]);
    res.subscribe((res) => {
      let users = res[0];
      let testimonials: testimonial[] = [];
      res[1].forEach((testi) => {
        let user = users.find((u) => u.uid === testi.uid);
        if (!user) return;
        testimonials.push({ ...testi, user });
      });
      this.testimonials.next(testimonials);
    });
  }

  getTestimonials() {
    return this.testiCollection.snapshotChanges().pipe(
      map((res) => {
        return res.map((e) => {
          return {
            ...e.payload.doc.data(),
            tid: e.payload.doc.id,
          };
        });
      })
    );
  }

  toggleTestimonial(tid: string, approved: boolean) {
    const testiRef: AngularFirestoreDocument<testimonial> = this.firestore.doc(
      `testimonial/${tid}`
    );
    testiRef.update({ approved });
  }

  addTestimonial(testimonial: testimonial) {
    return this.testiCollection.add(testimonial);
  }

  deleteTestimonial(TID: string) {
    return this.testiCollection.doc(TID).delete();
  }
}
