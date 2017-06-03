import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  userName = 'No Name';

  constructor(private _authServ: AuthService, private route: Router) {
  }

  ngOnInit() {
    this.userName = this._authServ.currentUserDisplayName;
  }

}
