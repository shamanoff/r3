import {Component, Input, OnInit} from '@angular/core';
import {FeedEntry} from "../feeds/model/feed-entry";
import {FeedService} from "../feeds/feed.service";

@Component({
  selector: 'app-newsru',
  templateUrl: './newsru.component.html',
  styleUrls: ['./newsru.component.scss']
})
export class NewsruComponent implements OnInit {


  @Input() feed: any;


  private feedUrl: string = 'http%3A%2F%2Ffeeds.newsru.co.il%2Fil%2Fwww%2Fnews%2Fbig&api_key=1cqrtfxjfkrgzksbt2burovgxlqd6gyo6qso29ou&count=14';
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
