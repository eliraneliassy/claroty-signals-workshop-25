import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PostsComponent} from '../posts/posts.component';
import {PostComment} from '../post-comment.interface';

@Component({
  selector: 'app-post-comments',
  imports: [],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentsComponent {
  @Input() comments: PostComment[] | null = [];

}
