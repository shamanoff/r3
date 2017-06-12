import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {AuthService} from "./auth.service";
import {AngularFireDatabase} from "angularfire2/database";
import * as _ from 'lodash';
import {Marker} from "../map/marker";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GoogleMapService {
  coordinates: Object = {

    lat: '',
    lng: ''
  };
  marker$: Observable<Marker>;

  constructor(private _http: Http, private _authServ: AuthService, private _db: AngularFireDatabase,) {
  }

  getInfo(street: string, city: string) {
    return this._http.get('https://maps.googleapis.com/maps/api/geocode/json?address='
      + street + ',+' + city + ',+israel&key=AIzaSyATbHLEJIxXo3yLBciyu5I8mFKIo6Ewjgw')
      .map(
        (response: Response) => {
          const data = response.json();
          this.coordinates = _.get(data, ['results', '0', 'geometry', 'location']);
          // _.assign(this.coordinates, {'userId': this._authServ.currentUserId});
          console.log('COOR ' + JSON.stringify(this.coordinates));
          this.saveCoordinates();
          return data;

        });

  }

  saveCoordinates() {
    const path = `users/${this._authServ.currentUserId}`;
    this._db.object(path).update(this.coordinates)
      .catch(error => console.log(error));
  };
}
