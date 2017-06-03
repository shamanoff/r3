import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  state = '';
  error: any;
  constructor(public _af: AngularFireAuth, public router: Router, private _authServ: AuthService) { }

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

  ngOnInit() {
  }

}
