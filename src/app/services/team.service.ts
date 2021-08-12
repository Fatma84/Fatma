import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { team } from '../core/modals/join-team/team.model';

import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  team = new BehaviorSubject<team[]>([]);
  private teamCollection: AngularFirestoreCollection<team>;

  constructor(
    private firestore: AngularFirestore,
    private usersService: UsersService
  ) {
    this.teamCollection = this.firestore.collection<team>('team');
    this.combineUsersWithTeam();
  }

  private combineUsersWithTeam() {
    let users = this.usersService.getUsers();
    let team = this.getTeam();
    let res = combineLatest([users, team]);
    res.subscribe((res) => {
      let users = res[0];
      let team: team[] = [];
      res[1].forEach((_team) => {
        let user = users.find((u) => u.uid === _team.uid);
        if (!user) return;
        team.push({ ..._team, user });
      });
      this.team.next(team);
    });
  }

  getTeam() {
    return this.teamCollection.snapshotChanges().pipe(
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

  togglePerson(pid: string, approved: boolean) {
    const personRef: AngularFirestoreDocument<team> = this.firestore.doc(
      `team/${pid}`
    );
    personRef.update({ approved });
  }

  addTeam(team: team) {
    return this.teamCollection.add(team);
  }

  deletePerson(pid: string) {
    return this.teamCollection.doc(pid).delete();
  }
}
