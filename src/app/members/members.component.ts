import { AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {User} from '../shared/user';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FormBuilder, FormGroup} from '@angular/forms';
import {GoogleMapService} from '../shared/google-map.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, AfterViewInit {

  coordinates: Object = {
    lat: '31.046051',
    lng: '34.851612'
  };

  // form
  editForm: FormGroup;
  // validation
  nameMessage: string;
  emailMessage: string;
  phoneMessage: string;
  ageMessage: string;
  cityMessage: string;
  streetMessage: string;
  private validationMessages = {
    required: 'Это поле обязательно.',
    minlength: 'Введите больше символов.',
    email: 'Введите правильный адрес электронной почты.',

  };
  currentUser = {
    userName: '',
    email: '',
    phone: '',
    age: '',
    city: '',
    street: ''
  };

  editing = false;
  error;
  userId: string;
  userEmail: string;
  users: FirebaseListObservable<User[]>;
  user: Observable<firebase.User>;

  constructor(private _authServ: AuthService,
              private _af: AngularFireAuth,
              private router: Router,
              private _db: AngularFireDatabase,
              private _fb: FormBuilder,
              private _mapServ: GoogleMapService) {
  }

  ngOnInit() {
    this.userId = this._authServ.currentUserId;
    // this.setCurrentPosition();
    this.getCoordinates();


  }

  ngAfterViewInit(): void {
    this.getUser();

  }

  getUser() {
    this._db.object('/users/' + this.userId).subscribe(
      user => this.currentUser = user
    );
  }

/*  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

      });
    }
  }*/

  getCoordinates() {
    this._mapServ.getInfo(this.currentUser.city, this.currentUser.street)
      .subscribe(
        (data: any) => {
          this.coordinates = _.get(data, ['results', '0', 'geometry', 'location']);
        },
        (error) => console.log(error)
      );
  }

  onSubmit(): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this._authServ.currentUserId}`; // Endpoint on firebase
    this._db.object(path).update(this.currentUser)
      .catch(error => console.log(error));
    this.getUser();
    this.editing = false;
    this.getCoordinates();
  }

}
