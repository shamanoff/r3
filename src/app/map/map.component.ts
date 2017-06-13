import {Component, OnInit} from '@angular/core';

import {GoogleMapService} from '../shared/google-map.service';
import {Observable} from 'rxjs/Observable';
import {Marker} from './marker';
import {AuthService} from '../shared/auth.service';
import {User} from '../shared/user';
import * as _ from 'lodash';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  markCount = '';
  userCount = '';
  coordinates = {
    lat: 32.085300,
    lng: 34.781768
  };
  users: User[];


  constructor(private _mapServ: GoogleMapService, private _authServ: AuthService, private _db: AngularFireDatabase) {
    // this.userCount = this.users.length.toString();
    console.log('count ' + this.markCount)
  }

  ngOnInit() {
    this._authServ.getUsers().subscribe(
      u => {
        this.users = u
      }
    );


  }





}
