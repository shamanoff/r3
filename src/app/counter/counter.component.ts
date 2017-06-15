import {Attribute, Component, OnInit} from '@angular/core';

import {CountService} from "./count.service";
import {FirebaseObjectObservable} from "angularfire2/database";

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  currentUsersCounter;

  private today;
  constructor(@Attribute('format') private format,
              private _cServ: CountService, ) {
    this.format = format;
    this.today =  new Date();
    setInterval(() => {
      this.today =  new Date();
    }, 1000);
  }

  ngOnInit() {
    // console.log(this._authServ.user$);

   this._cServ.getUsersCount().subscribe(
     // counter => this.currentUsersCounter = counter
     snapshot  => {this.currentUsersCounter = snapshot.val()}

         )


  }

}
