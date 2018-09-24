import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  isAuthenticated = false;
  userChanged = new Subject<string>();

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }


  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('current user is ' + JSON.stringify(this.firebaseAuth.auth.currentUser));
        console.log('Success!', value);
        this.userChanged.next(email);
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
        this.userChanged.next(email);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.userChanged.next('');
  }
}
