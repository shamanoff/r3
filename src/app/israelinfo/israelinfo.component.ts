import {Component, Input, OnInit} from '@angular/core';
import {FeedEntry} from "../feeds/model/feed-entry";
import {FeedService} from "../feeds/feed.service";

@Component({
  selector: 'app-israelinfo',
  templateUrl: './israelinfo.component.html',
  styleUrls: ['./israelinfo.component.scss']
})
export class CursorComponent implements OnInit {

  @Input() feed: any;


  private feedUrl: string = 'http%3A%2F%2Fisraelinfo.co.il%2Fxml%2Fnews.xml&api_key=1cqrtfxjfkrgzksbt2burovgxlqd6gyo6qso29ou&count=13';
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
