import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ToastrService } from 'ngx-toastr';
import { FormlyUtilsService, SdsFormlyTypes } from '@gsa-sam/sam-formly';

import { IThreadService, GenericThreadService, CommentEntity, ThreadEntity } from '../thread.service';
import { ThreadMockService } from '../thread-mock.service';
import { SdsDialogRef, SdsDialogService } from '@gsa-sam/components';



@Component({
  selector: 'comment',
  templateUrl: 'comment.component.html'
})
export class CommentComponent implements OnInit {
  CommentMode = CommentMode;
  ngOnInit(): void {

  }
  characterCountShowMore: number = 200;
  showMore: boolean = false;

  @Input() comment: CommentEntity;

  @Output() deleteCommentEvent: EventEmitter<CommentEntity> = new EventEmitter<CommentEntity>();

  @Output() editCommentEvent: EventEmitter<CommentEntity> = new EventEmitter<CommentEntity>();


  commmentMode = CommentMode.READ;

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

  showMoreClick() {
    this.showMore = true;
  }

  showLessClick() {
    this.showMore = false;
  }

  getDateFormat(date2) {
    let date = new Date(date2);
    return this.getWordMonth(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear() + ' at ' + (date.getHours() % 12) + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + (date.getHours() >= 12 ? 'PM' : 'AM');
  }

  getWordMonth(num: number) {

    let monthTxt = '';
    //off by one
    switch (num + 1) {
      case 1:
        monthTxt = 'January';
        break;
      case 2:
        monthTxt = 'February';
        break;
      case 3:
        monthTxt = 'March';
        break;
      case 4:
        monthTxt = 'April';
        break;
      case 5:
        monthTxt = 'May';
        break;
      case 6:
        monthTxt = 'June';
        break;
      case 7:
        monthTxt = 'July';
        break;
      case 7:
        monthTxt = 'August';
        break;
      case 8:
        monthTxt = 'September';
        break;
      case 10:
        monthTxt = 'October';
        break;
      case 11:
        monthTxt = 'November';
        break;
      case 12:
        monthTxt = 'December';
        break;
      default:
        break;
    }
    return monthTxt;
  }

  editComment() {
    this.model.commentField = this.comment.comment;
    this.form.patchValue(this.model);
    this.commmentMode = CommentMode.UPDATE;
  }

  saveEditComment() {
    this.deleteCommentEvent.emit(this.comment);
  }

  deleteComment() {
    this.deleteCommentEvent.emit(this.comment);
  }

  cancelEditComment() {
    this.commmentMode = CommentMode.READ;
  }

  onModelChange(event) {

  }


}

export enum CommentMode { UPDATE, READ }


