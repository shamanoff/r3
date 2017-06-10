import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {User} from '../shared/user';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, AfterViewInit {


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
    email: 'Введите правильный адресс электронной почты.',

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
              private _fb: FormBuilder) {
  }
  ngOnInit() {
    this.userId = this._authServ.currentUserId;
  }
  ngAfterViewInit(): void {
    this.getUser();

  }

  getUser() {
    this._db.object('/users/' + this.userId).subscribe(
      user => this.currentUser = user
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
  }

}
