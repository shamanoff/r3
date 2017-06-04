import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  state = '';
  error: any;

  signUpForm: FormGroup;
  emailMessage: string;
  passwordMessage: string;

  private validationMessages = {
    required: 'This field is required.',
    minlength: 'Must be longer than 6 characters.',
    email: 'Please enter a valid email address.'
  };

  constructor(public _af: AngularFireAuth, public router: Router, private _authServ: AuthService, private _fb: FormBuilder) { }

  onSubmit(formData) {
    if (formData.valid) {
      this._authServ.emailSignUp(formData.value.email, formData.value.password)
        .then(
        res => {
          this.router.navigateByUrl('/members');
        }).catch(
        (err) => {
          this.error = err;
        } );
    }
  }

/*  onSubmit(formData) {
    if (formData.valid) {
      this._authServ.emailSignUp(formData.value.email, formData.value.password)
        .then(
          res => {
            this.router.navigateByUrl('/members');
          }).catch(
        (err) => {
          this.error = err;
        } );
    }
  }*/

/*  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this._af.auth.createUserWithEmailAndPassword(
         formData.value.email,
         formData.value.password,


      ).then(
        (success) => {
          this.router.navigate(['/members']);
        }).catch(
        (err) => {
          this.error = err;
        });
    }
  }*/

  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      email: ['', [Validators.email, Validators.required, Validators.minLength(6) ] ],
      password: ['', [Validators.required, Validators.minLength(6)] ]
    });
    const emailControl = this.signUpForm.get('email');
    emailControl.valueChanges.debounceTime(1000).subscribe(
      value => this.setEmailMessage(emailControl)
    );
    const passwordControl = this.signUpForm.get('password');
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
