import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Counter} from "./counter";

@Injectable()
export class CountService {
  // counter$: FirebaseListObservable<Counter>;
  count$: FirebaseObjectObservable<any>;
  constructor(private _afAuth: AngularFireAuth,
              private _db: AngularFireDatabase) { }



  //// Helpers Counters ////
/*  updateUsersCounter() {
    const path = `usersCounter/`; // Endpoint on firebase
    const data = {
     usersCouner: 1
    };

    this._db.object(path).update(data)
      .catch(error => console.log(error));
  }*/

  getUsersCount() {
    this.count$ = this._db.object('/counters');
    // console.log(this.count$ + 'COUNTS');
    return this.count$;
  }


}
