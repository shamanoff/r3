import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';


@Injectable()
export class CountService {
  // counter$: FirebaseListObservable<Counter>;
  count$: FirebaseObjectObservable<any>;
  count;
  constructor(private _afAuth: AngularFireAuth,
              private _db: AngularFireDatabase,
  ) {}

  //// Helpers Counters ////


  getUsersCount() {
    this.count$ = this._db
      .object('/counters/1/usersCounter',
        {preserveSnapshot: true});
    return this.count$;
  }

  updateUsersCounter() {
    this.getUsersCount().subscribe(
      snapshot  => {this.count = snapshot.val()}
    );
    const c = this.count + 1;
    this._db.object('/counters/1').set({
      usersCounter: c
    });
    console.log(c + 'Const+')
    return c;
  }

}
