import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  state = '';
  error: any;

  loginForm: FormGroup;
  emailMessage: string;
  passwordMessage: string;

  private validationMessages = {
    required: 'This field is required.',
    minlength: 'Must be longer than 6 characters.',
    email: 'Please enter a valid email address.'
  };

  constructor(public _af: AngularFireAuth, private router: Router, private _authServ: AuthService, private _fb: FormBuilder) {
    this._af.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/members']);
      }
    });
    console.log(_authServ.currentUserId);
  }

  onSubmit(formData) {
    if (formData.valid) {
      this._authServ.emailLogin(formData.value.email, formData.value.password).then(
        res => {
          console.log('success');
          this.router.navigateByUrl('/members');
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        });
    }
  }



  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(3) ] ],
      password: ['', [Validators.required, Validators.minLength(3)] ]
    });
    const emailControl = this.loginForm.get('email');
    emailControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setEmailMessage(emailControl)
    );
    const passwordControl = this.loginForm.get('password');
    passwordControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setPasswordMessage(passwordControl)
    );
  }


  setEmailMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

  setPasswordMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMessage = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }

}
