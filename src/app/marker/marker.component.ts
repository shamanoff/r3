import {Component, Input, OnInit} from '@angular/core';
import {FeedService} from "../feeds/feed.service";
import {FeedEntry} from "../feeds/model/feed-entry";

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements OnInit {


  @Input() feed: any;


  private feedUrl: string = 'http%3A%2F%2Fwww.themarker.com%2Fcmlink%2F1.145&api_key=1cqrtfxjfkrgzksbt2burovgxlqd6gyo6qso29ou&count=13';
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
