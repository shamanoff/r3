import { Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {
  loginError: string;

  private _authState: any = '';

  set authState(value: any) {
    this._authState = value;
  }

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {

    this.afAuth.authState.subscribe((auth) => {
      this._authState = auth;
    });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this._authState = user;
        this.updateUserData();
      })
      // .catch(error => console.log('signup - ' + error.message));
  .catch(error => console.log(error));

  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this._authState = user;
        this.updateUserData();
      })
    .catch(error => console.log(error));
    // .catch(error => this.loginError = error.message);

  }


  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const auth = this.afAuth.auth;

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }


  //// Sign Out ////

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }



  // Returns true if user is logged in
  get authenticated(): boolean {
    return this._authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this._authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this._authState.uid : '';
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this._authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this._authState) { return 'Guest'; }
    else if (this.currentUserAnonymous) { return 'Anonymous'; }
    else { return this._authState['displayName'] || 'User without a Name'; }
  }


  //// Helpers ////

  private updateUserData(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this._authState.email,
      name: this._authState.displayName
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));

  }

}
