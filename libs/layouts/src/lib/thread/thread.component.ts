import { ChangeDetectorRef, Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

  commentCount: number = 0;
  comments: CommentEntity[];

  @ViewChild('templateRef') ref: TemplateRef<any>;

  openedDialogRef: SdsDialogRef<any>;


  constructor(){}//public dialog: SdsDialogService) { }



  ngOnInit(): void {

  }

  buttonClicked() {
    // if (!this.openedDialogRef) {
    //   this.openedDialogRef = this.dialog.open(this.ref, {
    //     hasBackdrop: false,
    //     height: '100%',
    //     position: { right: 'true' },
    //     slideOut: true
    //   })
    // } else {
    //   this.openedDialogRef.close();
    //   this.openedDialogRef = null;
    // }
  }


}

