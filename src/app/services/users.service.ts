import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../auth/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection<User>('users');
  }

  getUsers() {
    return this.usersCollection.snapshotChanges().pipe(
      map((res) => {
        return res.map((e) => {
          return {
            ...e.payload.doc.data(),
            uid: e.payload.doc.id,
          } as User;
        });
      })
    );
  }

  addUser(user: User) {
    return this.usersCollection.add(user);
  }

  deleteUser(UID: string) {
    return this.usersCollection.doc(UID).delete();
  }
}
