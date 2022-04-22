import { Injectable } from '@angular/core';
import { CommentEntity, IThreadService, ThreadEntity} from './thread.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class ThreadMockService implements IThreadService {

  constructor() {

  }


  createThread(thread: ThreadEntity): Observable<ThreadEntity> {
    throw new Error('Method not implemented.');
  }
  createComment(comment: CommentEntity): Observable<CommentEntity> {
    throw new Error('Method not implemented.');
  }
  editComment(comment: CommentEntity, commentId: string): Observable<CommentEntity> {
    throw new Error('Method not implemented.');
  }
  deleteComment(commentId: string): Observable<CommentEntity> {
    throw new Error('Method not implemented.');
  }
  getComments(threadId: string): Observable<CommentEntity[]> {
    throw new Error('Method not implemented.');
  }
  getCommentCount(threadId: string): Observable<number> {
    throw new Error('Method not implemented.');
  }



}


