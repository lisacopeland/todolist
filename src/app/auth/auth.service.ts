import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription, Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  isAuthenticated = false;
  currentUserEmail: string;
  userChanged = new Subject<string>();

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    this.user.subscribe(data => {
        console.log(data.email);
        if (data.email) {
          this.currentUserEmail = data.email;
          this.userChanged.next(data.email);
          this.isAuthenticated = true;
        }
    });
  }

  getCurrentUserEmail() {
    return this.currentUserEmail;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('current user is ' + JSON.stringify(this.firebaseAuth.auth.currentUser));
        console.log('Success!', value);
        this.userChanged.next(email);
        this.isAuthenticated = true;
        return 'ok';
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        return 'not ok';
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('current user is ' + JSON.stringify(this.firebaseAuth.auth.currentUser));
        console.log('Nice, it worked!');
        this.isAuthenticated = true;
        this.userChanged.next(email);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  faceBookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.firebaseAuth
      .auth
      .signInWithPopup(provider)
      .then(value => {
        console.log('current user is ' + JSON.stringify(this.firebaseAuth.auth.currentUser));
        console.log('value is ' + value.user.email);
        this.isAuthenticated = true;
        this.userChanged.next(value.user.email);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    this.firebaseAuth
      .auth
      .signInWithPopup(provider)
      .then(value => {
        console.log('current user is ' + JSON.stringify(this.firebaseAuth.auth.currentUser));
        console.log('value is ' + value.user.email);
        this.isAuthenticated = true;
        this.userChanged.next(value.user.email);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }


  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.isAuthenticated = false;
    this.userChanged.next('');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

}
