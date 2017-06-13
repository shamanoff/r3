import {Component, Input, OnInit} from '@angular/core';
import {FeedService} from "../feeds/feed.service";
import {FeedEntry} from "../feeds/model/feed-entry";

@Component({
  selector: 'app-nep',
  templateUrl: './nep.component.html',
  styleUrls: ['./nep.component.scss']
})
export class NepComponent implements OnInit {

  @Input() feed: any;


  private feedUrl: string = 'https%3A%2F%2Fnepmag.com%2Ffeed%2F&api_key=1cqrtfxjfkrgzksbt2burovgxlqd6gyo6qso29ou&count=16';
  feeds: Array<FeedEntry> = [];
  constructor(private _feedService: FeedService) { }

  ngOnInit() {
    this.refreshFeed();
  }
  refreshFeed() {
    this.feeds.length = 0;
    // Adds 1s of delay to provide user's feedback.
    this._feedService.getFeedContent(this.feedUrl)
      .subscribe(
        feed => this.feeds = feed.items,
        error => console.log(error));
  }

  openLinkInBrowser() {
    window.open(this.feed.link);
  }
}
