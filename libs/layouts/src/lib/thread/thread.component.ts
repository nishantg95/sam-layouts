import { ChangeDetectorRef, Component, Inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { FormlyUtilsService, SdsFormlyTypes } from '@gsa-sam/sam-formly';

import { IThreadService, GenericThreadService, CommentEntity, ThreadEntity } from './thread.service';
import { ThreadMockService } from './thread-mock.service';
import { SdsDialogRef, SdsDialogService } from '@gsa-sam/components';


@Component({
  selector: 'thread',
  templateUrl: 'thread.component.html'
})
export class GenericThreadComponent implements OnInit {
  @Input() threadId: string = '0';
  commentCount: number = 0;
  comments: CommentEntity[];

  model = { commentField: '' };
  form = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'commentField',
      type: 'input',
      templateOptions: {
        label: 'Comment',
        placeholder: 'Write a comment…',
        maxLength: 500,
        rows: 5
      },
    },
  ];

  onModelChange(model) {

  }
  expandedText: boolean = false;

  @ViewChild('templateRef') ref: TemplateRef<any>;

  openedDialogRef: SdsDialogRef<any>;

  expandTextBox: boolean = false;

  colapse() {
    this.expandTextBox = false;
  }

  expand() {
    this.expandTextBox = true;
  }

  constructor(private service: ThreadMockService, public dialog: SdsDialogService
    //,public toastr: ToastrService
  ) {

  }



  ngOnInit(): void {
    //create thread id if not exist
    //if do exist get count

    //add on close behavior to pass threadId
  }


  saveComment() {
    let comment = new CommentEntity(null, this.threadId, this.model.commentField, 'User', 'LUser', '', true, new Date());

    this.service.createComment(comment, this.threadId).subscribe((comment: CommentEntity) => {
      this.comments.push(comment);
      this.commentCount = this.comments.length;
      this.model.commentField = '';
      this.form.patchValue(this.model);
    },
      err => {
        console.error(err);
        // this.toastr.error('Comments could not be loaded', "");
      },
    );
  }


  deleteComment(comment: CommentEntity) {
    let comment2= comment;
    this.service.deleteComment(comment).subscribe((comment: CommentEntity) => {
      this.comments = this.comments.filter(function (ele: CommentEntity) {
        return ele.id != comment2.id;
      });
      this.commentCount = this.comments.length;
    },
      err => {
        console.error(err);
        // this.toastr.error('Comments could not be loaded', "");
      },
    );
  }

  editComment(comment: CommentEntity) {
    let comment2= comment;
    this.service.editComment(comment, comment.id).subscribe((comment: CommentEntity) => {

      let commentFound: CommentEntity = this.comments.find(element => element.id === comment2.id);
      commentFound.comment = comment2.comment;

    },
      err => {
        console.error(err);
        // this.toastr.error('Comments could not be loaded', "");
      },
    );
  }


  buttonClicked() {
    this.service.getComments(this.threadId).subscribe((comments: CommentEntity[]) => {
      this.comments = comments;
      this.commentCount = comments.length;
      if (!this.openedDialogRef) {
        this.openedDialogRef = this.dialog.open(this.ref, {
          hasBackdrop: false,
          height: '100%',
          position: { right: 'true' },
          slideOut: {
            width: '20rem',
            time: '350ms',
          },
        })
      }
      else {
        this.openedDialogRef.close();
        this.openedDialogRef = null;
      }
    },
      err => {
        console.error(err);
        // this.toastr.error('Comments could not be loaded', "");
      },
    );
  }


}

