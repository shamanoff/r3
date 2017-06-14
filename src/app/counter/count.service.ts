import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class CountService {
  // counter$: FirebaseListObservable<Counter>;
  count$: FirebaseObjectObservable<any>;
  constructor(private _afAuth: AngularFireAuth,
              private _db: AngularFireDatabase) { }



  //// Helpers Counters ////
  updateUsersCounter() {
    let count = 0;
    this.getUsersCount()
      .subscribe(
        snapshot  => {//noinspection JSAnnotator
          count = snapshot.val(); }
    );
    const path = `counters/1/`; // Endpoint on firebase
    //noinspection JSAnnotator
    const data = {
     usersCounter: count ++
    };

    this._db.object(path).update(data)
      .catch(error => console.log(error));
  }

  getUsersCount() {
    this.count$ = this._db.object('/counters/1/usersCounter', {preserveSnapshot: true});
    // console.log(this.count$ + 'COUNTS');
    return this.count$;
  }


}
