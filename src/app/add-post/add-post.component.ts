import {Component, OnInit} from '@angular/core';
import {PostsService} from '../posts/posts.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  userId;

  constructor(private _ps: PostsService,
              private _fb: FormBuilder,
              private _authServ: AuthService) {
  }

  ngOnInit() {
    this.userId = this._authServ.currentUserId;
    // this.getUser();
    this.postForm = this._fb.group({
      title: ['', [Validators.minLength(3)]],
      text: ['', [Validators.required, Validators.minLength(6)]],
      url: ['', [Validators.minLength(6)]],
      pic: ['', [Validators.minLength(2)]]

    });
    /*  const userNameControl = this.postForm.get('userName');
     userNameControl.valueChanges.debounceTime(1000)
     .subscribe(
     value => this.setNameMsg(userNameControl)
     );*/


    // this.populateData();
  }


}
