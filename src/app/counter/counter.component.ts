import {Attribute, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  private today;
  constructor(@Attribute("format") private format) {
    this.format = format;
    this.today =  new Date();
    setInterval(() => {
      this.today =  new Date();
    }, 1000);
  }

  ngOnInit() {
  }

}
