import {Component, OnInit} from '@angular/core';

import {GoogleMapService} from '../shared/google-map.service';
import {Observable} from 'rxjs/Observable';
import {Marker} from './marker';
import {AuthService} from '../shared/auth.service';
import {User} from '../shared/user';
import * as _ from 'lodash';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  coordinates = {
    lat: 32.085300,
    lng: 34.781768
  };
  user$: FirebaseListObservable<any[]>;
  users: User[];
  // marker$: Observable<Marker[]>;


  constructor(private _mapServ: GoogleMapService, private _authServ: AuthService, private _db: AngularFireDatabase) {
  }

  ngOnInit() {
    this._authServ.getUsers().subscribe(
      u => {
        this.users = u
      }
    );
    console.log(JSON.stringify(this.users) + 'ARRAY')
/*    this.user$ = this._db.list('users');
    this.user$.subscribe(
      user => this.markers.push(user)
    );
    console.log(this.markers);*/

    /*    this._authServ.user$.map(
          user => this.markers = user
          // user => console.log(JSON.stringify(user) + 'USER')
        );
        console.log(JSON.stringify(this.markers));*/


    // this.converter(this._af.user$);
    // console.log(JSON.stringify(this.marker$) + 'MARK');
  }


/*  converter(users: Observable<User[]>) {
    this.marker$ = _.map(users, (user) => {
        return _(user).pick('userName').value();
        // return _(user).pick('userName').assign('lat').assign('lng');
      }
    );
  }*/
}
