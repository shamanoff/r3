import {Component} from '@angular/core';
import {PostsService} from '../posts/posts.service';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.scss']
})
export class AddPostFormComponent {

  defPost = {
    author: '',
    authorId: '',
    title: '',
    text: '',
    url: '',
    pic: ''
  };
  constructor(private _ps: PostsService) {
  }


  addPost( author: string,
           authorId: string,
           title?: string,
           text?: string,
           url?: string,
           pic?: string) {
    const created_at = new Date().toString();
    const newPost = {
      author: author,
      authorId: authorId,
      date: created_at,
      title: title,
      text: text,
      url: url,
      pic: pic,
    };
    this._ps.addPost(newPost);

  }

}
