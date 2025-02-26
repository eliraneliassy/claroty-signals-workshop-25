import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BehaviorSubject, Observable, of, switchMap} from 'rxjs';
import {User} from './user.interface';
import {PostsService} from './posts.service';
import {UsersComponent} from './users/users.component';
import {AsyncPipe} from '@angular/common';
import {Post} from './posts.interface';
import {PostsComponent} from './posts/posts.component';
import {PostComment} from './post-comment.interface';
import {PostCommentsComponent} from './post-comments/post-comments.component';
import {httpResource} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    UsersComponent,
    AsyncPipe,
    PostsComponent,
    PostCommentsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  postsService = inject(PostsService);
  users$: Observable<User[]> = this.postsService.fetchUsers();
  selectedUser$ = new BehaviorSubject<User | undefined>(undefined);
  selectedPost$ = new BehaviorSubject<Post | undefined>(undefined);
  posts$ : Observable<Post[]> =
    this.selectedUser$.pipe(
    switchMap((user: User | undefined) =>
      user ? this.postsService.fetchPosts(user?.id) : of([])));

  comments$ : Observable<PostComment[]> = this.selectedPost$.pipe(
    switchMap((post: Post | undefined) =>
    post ? this.postsService.fetchComments(post.id) : of([]))
  )




  onSelectedUser(user: User){
    this.selectedUser$.next(user);
    this.selectedPost$.next(undefined);
  }

  onSelectedPost(post: Post) {
    this.selectedPost$.next(post);
  }


}
