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
export class MembersComponent implements OnInit{


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
/*    this.user = _af.authState;
    this.user.subscribe(
      value => {
        this.userEmail = value.email;
      }
    );*/

  }

  ngOnInit() {
    this.userId = this._authServ.currentUserId;
    this.getUser();
    this.editForm = this._fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.minLength(2)]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      street: ['', [Validators.required, Validators.minLength(3)]],
    });
    const userNameControl = this.editForm.get('userName');
    userNameControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setNameMsg(userNameControl)
      );
    const emailControl = this.editForm.get('email');
    emailControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setEmailMsg(emailControl)
    );
    const phoneControl = this.editForm.get('phone');
    phoneControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setPhoneMsg(phoneControl)
      );
    const ageControl = this.editForm.get('age');
    ageControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setAgeMsg(ageControl)
      );
    const cityControl = this.editForm.get('city');
    cityControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setCityMsg(cityControl)
      );
    const streetControl = this.editForm.get('street');
    streetControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setStreetMsg(streetControl)
      );
    // this.populateData();
  }

  getUser() {
    this._db.object('/users/' + this.userId).subscribe(
      user => this.currentUser = user
    );
  }

/*  populateData(){
    this.editForm.setValue({
      userName: this.currentUser.userName,
      email: this.currentUser.email,
      phone: this.currentUser.phone,
      age: this.currentUser.age,
      city: this.currentUser.city,
      street: this.currentUser.street
    });
  }*/

  setNameMsg(c: AbstractControl): void {
    this.nameMessage = '';
    if ( c.errors) {
      this.nameMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setEmailMsg(c: AbstractControl): void {
    this.emailMessage = '';
    if ( c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setPhoneMsg(c: AbstractControl): void {
    this.phoneMessage = '';
    if ( c.errors) {
      this.phoneMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setAgeMsg(c: AbstractControl): void {
    this.ageMessage = '';
    if (c.errors) {
      this.ageMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setCityMsg(c: AbstractControl): void {
    this.cityMessage = '';
    if ( c.errors) {
      this.cityMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setStreetMsg(c: AbstractControl): void {
    this.streetMessage = '';
    if ( c.errors) {
      this.streetMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  /*  onSubmit(formData) {
   if (formData.valid) {
   this._authServ.(formData.value.email, formData.value.password)

   }
   }*/

  onSubmit(formData): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    const path = `users/${this._authServ.currentUserId}`; // Endpoint on firebase
    const data = {
      userName: formData.value.userName,
      email: formData.value.email,
      phone: formData.value.phone,
      age: formData.value.age,
      city: formData.value.city,
      street: formData.value.street
    };
    if (formData.valid) {
      console.log('valid');
      this._db.object(path).update(data)
        .catch(error => console.log(error));

    }else console.log('not valid' + formData.valid);
    this.getUser();
    this.editing = false;
  }
/*  ngAfterViewChecked(): void {
    this.populateData();
  }*/
}
