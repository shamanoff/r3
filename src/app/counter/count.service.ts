import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";


@Injectable()
export class CountService {
  // counter$: FirebaseListObservable<Counter>;
  count$: FirebaseObjectObservable<any>;
  count;
  constructor(private _afAuth: AngularFireAuth,
              private _db: AngularFireDatabase,
  ) { }



  //// Helpers Counters ////
  updateUsersCounter() {
// let count = this.cc.currentUsersCounter;
// console.log(count + 'CCCC')
  // const path = `counters/1`;
/*    this._db.object(path).set({
      usersCounter: 0
    })
      .catch(error => console.log(error));*/
  }

  getUsersCount() {
    this.count$ = this._db
      .object('/counters/1/usersCounter',
        {preserveSnapshot: true});
    return this.count$;
  }

}
