import {Component, OnInit} from '@angular/core';
import {PostsService} from '../posts/posts.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/auth.service';
import {User} from "../../shared/user";

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  currentUser: User;
  maxMsg = '';
  private validationMessages = {
    required: 'Это поле обязательно.',
    minlength: 'Введите больше символов.',
    maxlength: 'Слишком много символов.',

  };

  constructor(private _ps: PostsService,
              private _fb: FormBuilder,
              private _authServ: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this._authServ.currentUser;
    this.postForm = this._fb.group({
      title: ['', [Validators.maxLength(100)]],
      text: ['', [Validators.maxLength(600)]],
      url: ['', [Validators.maxLength(600)]],
      pic: ['', [Validators.maxLength(600)]],


    });

    const titleControl = this.postForm.get('title');
    titleControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setMaxMsg(titleControl)
      );
    const textControl = this.postForm.get('text');
    textControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setMaxMsg(textControl)
      );
    const urlControl = this.postForm.get('url');
    urlControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setMaxMsg(urlControl)
      );
    const picControl = this.postForm.get('pic');
    picControl.valueChanges.debounceTime(1000)
      .subscribe(
        value => this.setMaxMsg(picControl)
      );
    // this.populateData();
  }

  setMaxMsg(c: AbstractControl): void {
    this.maxMsg = '';
    if (c.errors) {
      this.maxMsg = Object.keys(c.errors)
        .map(key => this.validationMessages[key])
        .join(' ');
      console.log(Object.keys(c.errors));
    }
  }


  onSubmit(formData): void {

    const created_at = new Date().toString();


    const data = {
      author: this.currentUser.userName,
      authorId: this._authServ.currentUserId,
      date: created_at,
      title: formData.value.street,
      text: formData.value.street,
      url: formData.value.street,
      pic: formData.value.street,
    };
    if (formData.valid && formData) {
      console.log('valid');
      this._ps.addPost(data)
        .catch(error => console.log(error));

    } else console.log('not valid' + formData.valid);
    formData.reset();
  }
}
