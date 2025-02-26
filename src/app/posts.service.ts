import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.interface';
import {Observable} from 'rxjs';
import {Post} from './posts.interface';
import {PostComment} from './post-comment.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  http = inject(HttpClient);

  BASE_URL = `https://jsonplaceholder.typicode.com`;

  fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`)
  }

  fetchPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}/posts?userId=${userId}`)
  }

  fetchComments(postsId: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.BASE_URL}/comments?postId=${postsId}`)
  }
}
