import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AuthService} from '../shared/auth.service';
import {Http} from '@angular/http';
import {Post} from '../shared/post';

@Injectable()
export class PostsService {
  public post$: FirebaseListObservable<Post[]>;

  constructor(private _http: Http, private _authServ: AuthService, private _db: AngularFireDatabase) {
  }

  getPosts() {
    this.post$ = this._db.list('/posts', {
      query: {
        // limitToLast: (10),

        // orderByChild: 'category',
        // equalTo: category
      }
    }) as
      FirebaseListObservable<Post[]>;
    return this.post$;
  }

}
