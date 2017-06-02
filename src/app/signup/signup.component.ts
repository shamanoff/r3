import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  state = '';
  error: any;
  constructor(public _af: AngularFireAuth, public router: Router) { }

  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      this._af.auth.createUserWithEmailAndPassword(
         formData.value.email,
         formData.value.password
      ).then(
        (success) => {
          this.router.navigate(['/members']);
        }).catch(
        (err) => {
          this.error = err;
        });
    }
  }
  ngOnInit() {
  }

}
