
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PostsComponent} from "./posts/posts.component";
import {AddPostComponent} from "./add-post/add-post.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations:[
    PostsComponent,
    AddPostComponent,
  ],
  exports:[
    CommonModule,
    PostsComponent,
    AddPostComponent
  ]
})
export class PostModule {}
