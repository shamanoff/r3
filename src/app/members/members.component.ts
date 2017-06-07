import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {User} from "../shared/user";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {

  userId: string;
  user;
 input: string = '';
  constructor(private _authServ: AuthService, private route: Router, private _db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.userId = this._authServ.currentUserId;
    this.user = this._authServ.getUser(this.userId)
      .subscribe(item => this.user = item);
    console.log('log '+ this.user.name);
  }

  setUserName(userName: string) {
    this._authServ.setName(userName);
     this.input = '';
  }

  ngOnDestroy(){
    this.user.unsubscribe();
  }

}
