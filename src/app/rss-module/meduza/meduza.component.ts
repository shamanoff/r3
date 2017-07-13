import {Component, Input, OnInit} from '@angular/core';
import {FeedService} from "../feeds/feed.service";
import {FeedEntry} from "../feeds/model/feed-entry";
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-meduza',
  templateUrl: './meduza.component.html',
  styleUrls: ['./meduza.component.scss']
})
export class MeduzaComponent implements OnInit {

  @Input() feed: any;


  private feedUrl: string = 'https%3A%2F%2Fmeduza.io%2Frss%2Farticles&api_key=1cqrtfxjfkrgzksbt2burovgxlqd6gyo6qso29ou&count=13';
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
