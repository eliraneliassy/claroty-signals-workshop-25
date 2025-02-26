import {
  afterRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component, computed,
  effect,
  inject, linkedSignal, resource,
  signal, WritableSignal
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
import {rxResource, toSignal} from '@angular/core/rxjs-interop';
import {map, of} from 'rxjs';

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

  // users = rxResource({
  //   loader: () => this.postsService.fetchUsers(),
  // });

  users = this.postsService.fetchUsers2();

  selectedUser = signal<User | undefined>(undefined);
  selectedPost: WritableSignal<Post | undefined> = linkedSignal(({
    source: () => this.selectedUser(),
    computation: () => undefined
  }))

  posts = rxResource({
    request: () => this.selectedUser(),
    loader: ({request: selectedUser}) =>
      selectedUser ? this.postsService.fetchPosts(selectedUser.id) : of([])
  })

  comments = resource({
    request: () => this.selectedPost(),
    loader: ({request: selectedPost}) =>
      selectedPost ?
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${selectedPost.id}`)
          .then(res => res.json()) : Promise.resolve([])
  })

}
