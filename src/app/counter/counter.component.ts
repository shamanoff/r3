import {Attribute, Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {User} from "../shared/user";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  count;
  private today;
  users: User[];
  constructor(@Attribute('format') private format, private _authServ: AuthService) {
    this.format = format;
    this.today =  new Date();
    setInterval(() => {
      this.today =  new Date();
    }, 1000);
  }

  ngOnInit() {
    // console.log(this._authServ.user$);
    this._authServ.getUsers().subscribe(
      u => {
        this.users = u;
      }
    );
    this.count = this._authServ.getCount();

  }

}
