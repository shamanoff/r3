import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  state = '';
  error: any;
  constructor(public _af: AngularFireAuth, private router: Router, private _authServ: AuthService) {
/*    this._af.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/members']);
      }
    });*/
  }

  onSubmit(formData) {
    if (formData.valid) {
      this._authServ.emailLogin(formData.value.email, formData.value.password).then(
        (success) => {
          console.log(success);
          this.router.navigate(['/members']);
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        });
    }
  }

/*  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this._af.auth.signInWithEmailAndPassword(
          formData.value.email,
          formData.value.password)
        .then(
        (success) => {
          console.log(success);
          this.router.navigate(['/members']);
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        });
    }
  }*/

  ngOnInit() {
  }

}
