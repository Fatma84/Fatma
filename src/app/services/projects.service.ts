import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { project } from '../pages/dashboard/projects/projects.interface';
import { FRAMEWORKS } from '../data/frameworks';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects = new BehaviorSubject<project[]>([]);

  readonly frameworks = FRAMEWORKS;

  private projectCollection: AngularFirestoreCollection<project>;

  constructor(private firestore: AngularFirestore) {
    this.projectCollection = this.firestore.collection<project>(
      'projects',
      (ref) => ref.orderBy('priority')
    );
  }

  getProjects() {
    return this.projectCollection.snapshotChanges().pipe(
      map((res) => {
        return res.map((e) => {
          return {
            ...e.payload.doc.data(),
            pid: e.payload.doc.id,
          } as project;
        });
      })
    );
  }

  addProject(project: project) {
    return this.projectCollection.add(project);
  }

  deleteProject(PID: string) {
    return this.projectCollection.doc(PID).delete();
  }
}
