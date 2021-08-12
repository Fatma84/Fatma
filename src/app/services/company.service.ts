import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { company } from '../pages/dashboard/companies/companies.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companies = new BehaviorSubject<company[]>([]);

  private companyCollection: AngularFirestoreCollection<company>;

  constructor(private firestore: AngularFirestore) {
    this.companyCollection = this.firestore.collection<company>('company');
  }

  getCompanies() {
    return this.companyCollection.snapshotChanges();
  }

  addCompany(company: company) {
    return this.companyCollection.add(company);
  }

  deleteCompany(CID: string) {
    return this.companyCollection.doc(CID).delete();
  }
}
