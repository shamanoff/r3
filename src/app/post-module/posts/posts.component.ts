import { Component, OnInit } from '@angular/core';
import {PostsService} from './posts.service';
import {Observable} from 'rxjs/Observable';
import {Post} from '../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  userPost$: Observable<Post[]>;
  constructor(private _ps: PostsService) { }

  ngOnInit() {
    this.userPost$ = this._ps.getPosts();
  }

}
