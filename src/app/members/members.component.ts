import {Component,  OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {User} from "../shared/user";


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
error;
  userId: string;
  users: FirebaseListObservable<User[]>;
 input: string = '';
  constructor(private _authServ: AuthService, private route: Router,
              private _db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.userId = this._authServ.currentUserId;
  /*  this.users = this._db.list('users')
      .catch(err => this.error = err);*/


  }

  setUserName(userName: string) {
    // this._authServ.setName(userName);
     this.input = '';
  }



}
