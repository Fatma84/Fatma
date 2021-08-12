import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TitleCasePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { User } from './user';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | null>(null);

  private hideOneTapGoogle: boolean = false;

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.initGoogleOneTap();
  }

  private initGoogleOneTap(): void {
    window.onload = () => {
      google.accounts.id.initialize({
        client_id: environment.clientId,
        cancel_on_tap_outside: true,
        callback: (token: any) => {
          this.handleToken(token);
        },
      });
      this.fireAuth.onAuthStateChanged((user: any) => {
        if (user) {
          const titlePipe = new TitleCasePipe();
          const currentUser: User = {
            uid: user.uid,
            displayName: titlePipe.transform(user.displayName),
            email: user.email,
            photoURL: user.photoURL,
            phone: user.phone || null,
          };
          this.updateUserData(currentUser);
        } else {
          this.user$.next(null);
          if (!this.hideOneTapGoogle) google.accounts.id.prompt();
          this.hideOneTapGoogle = true;
        }
      });
    };
  }

  private handleToken(token: any) {
    const credential = firebase.auth.GoogleAuthProvider.credential(
      token.credential
    );
    this.fireAuth.signInWithCredential(credential);
  }

  private updateUserData(user: User) {
    this.user$.next(user);

    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(
      `users/${user.uid}`
    );
    userRef.set(user, { merge: true });
  }

  showOneTapGoogle() {
    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }
    });
  }

  signOut() {
    this.fireAuth.signOut();
    this.user$.next(null);
  }
}
