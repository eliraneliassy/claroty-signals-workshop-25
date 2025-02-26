import {ChangeDetectionStrategy, Component, EventEmitter, input, Input, model, Output} from '@angular/core';
import {Post} from '../posts.interface';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {
  posts = input<Post[] | undefined>([]);

  selectedPost = model<Post | undefined>(undefined);

  onSelectedPost(post: Post) {
    this.selectedPost.set(post);
  }


}
