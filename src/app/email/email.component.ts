import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']

})
export class EmailComponent implements OnInit {

  state = '';
  error: any;

  constructor(private _af: AngularFireAuth, private router: Router) {
   this._af.authState.subscribe(auth => {
     if (auth) {
       this.router.navigateByUrl('/members');
     }
     });
  }



  ngOnInit() {
  }

}
