import {
  afterRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal
} from '@angular/core';
import {User} from './user.interface';
import {PostsService} from './posts.service';
import {UsersComponent} from './users/users.component';
import {AsyncPipe} from '@angular/common';
import {Post} from './posts.interface';
import {PostsComponent} from './posts/posts.component';
import {PostComment} from './post-comment.interface';
import {PostCommentsComponent} from './post-comments/post-comments.component';
import {httpResource} from '@angular/common/http';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [
    UsersComponent,

    PostsComponent,
    PostCommentsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  postsService = inject(PostsService);

  users = toSignal(this.postsService.fetchUsers());
  selectedUser = signal<User | undefined>(undefined);
  selectedPost = signal<Post | undefined>(undefined);

  posts = signal<Post[]>([]);

  comments = signal<PostComment[]>([]);



  constructor() {
    effect(() => {
      const user = this.selectedUser();

      if(user) {
        this.postsService.fetchPosts(user.id).subscribe(
          (posts: Post[]) => {
            this.posts.set(posts);
          }
        )
      }
    });

    effect(() => {
      const selectedPost = this.selectedPost();

      if(selectedPost) {
        this.postsService.fetchComments(selectedPost.id).subscribe(
          (comments: PostComment[]) => {
            this.comments.set(comments);
          }
        )
      }
    });

    effect(() => {
      this.selectedUser();

      this.comments.set([]);
    });


  }




}
