import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from "./user";

@Injectable()
export class AuthService {
  loginError: string;
  user$: FirebaseListObservable<User[]>;
  private _authState: any = '';

  set authState(value: any) {
    this._authState = value;
  }

  constructor(private _afAuth: AngularFireAuth,
              private _db: AngularFireDatabase,
              private _router: Router) {

    this._afAuth.authState.subscribe((auth) => {
      this._authState = auth;
    });

  }

  //// Get Users ////

  getUsers() {
    this.user$ = this._db.list('/users') as
      FirebaseListObservable<User[]>;
      return this.user$;
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this._authState = user;
        this.updateUserData();
      })
      // .catch(error => console.log('signup - ' + error.message));
      .catch(error => console.log(error));

  }

  emailLogin(email: string, password: string) {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this._authState = user;
        this.updateUserData();

      })
      .catch(error => console.log(error));
    // .catch(error => this.loginError = error.message);

  }


  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const auth = this._afAuth.auth;

    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error));
  }


  //// Sign Out ////

  signOut(): void {
    this._afAuth.auth.signOut();
    this._router.navigate(['/']);
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
    return this._afAuth.authState;
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
    if (!this._authState) {
      return 'Guest';
    }
    else if (this.currentUserAnonymous) {
      return 'Anonymous';
    }
    else {
      return this._authState['displayName'] || 'User without a Name';
    }
  }


  //// Helpers ////

  private updateUserData(): void {
    // Writes user name and email to realtime _db
    // useful if your app displays information about users or for admin features

    const path = `users/${this.currentUserId}`; // Endpoint on firebase
    const data = {
      email: this._authState.email,
      name: this._authState.displayName
    };

    this._db.object(path).update(data)
      .catch(error => console.log(error));

  }

}
