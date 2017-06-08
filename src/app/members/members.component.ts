import {Component,  OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {User} from '../shared/user';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  editForm: FormGroup;

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
    this.user = _af.authState;
    this.user.subscribe(
      value => {
        this.userEmail = value.email;
      }
    );

  }

  ngOnInit() {
    this.editForm = this._fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)] ],
      email: ['', [Validators.email, Validators.required, Validators.minLength(6) ] ],
      phone: ['', [Validators.required, Validators.minLength(6)] ],
      userAge: ['', [Validators.required, Validators.minLength(3)] ],
      city: ['', [Validators.required, Validators.minLength(3)] ],
      street: ['', [Validators.required, Validators.minLength(3)] ],
    });


  }

  onSubmit(formData) {
    if (formData.valid) {
      this._authServ.emailSignUp(formData.value.email, formData.value.password)

    }
  }

  setUserName(userName: string) {
    // this._authServ.setName(userName);
  }



}
