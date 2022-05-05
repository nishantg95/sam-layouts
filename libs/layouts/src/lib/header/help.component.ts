import { CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { Component, ComponentRef, Inject, Input, ViewEncapsulation } from '@angular/core';
import {
  SdsDialogRef,
  SdsDialogService,
  SDS_DIALOG_DATA,
} from '@gsa-sam/components';

interface Data {
  help: [];
}

@Component({
  selector: 'sds-header-help',
  styleUrls: ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      class="usa-button usa-button--unstyled"
      (click)="openSlidePanel()"
      matTooltipClass='help-tooltip'
      matTooltip="Find help articles for features on this page"
      >
      <usa-icon
        class="text-info"
        [icon]="'question-circle'"
        [size]="'2x'"
      ></usa-icon>
    </button>
  `,
})
export class SdsHeaderHelpComponent {
  @Input() content;

  openedDialogRef: SdsDialogRef<HelpContentComponent>;

  constructor(public dialog: SdsDialogService) {}

  openSlidePanel() {
    this.openedDialogRef = this.dialog.open(HelpContentComponent, {
      hasBackdrop: false,
      height: '100%',
      position: { right: 'true' },
      slideOut: {
        width: '20rem',
        time: '350ms',
      },
      data: {
        help: this.content,
      },
    });
  }
}

@Component({
  template: `
    <div class="bg-base-lighter minh-full padding-x-2 padding-top-2">
      <div class="font-heading-lg text-semibold">Help</div>
      <div *ngFor="let item of data.help">
        <div
          class="font-heading-md text-semibold margin-top-205 margin-bottom-1"
        >
          {{ item.head.title }}
        </div>
        <ng-template
          *ngFor="let content of item.body.content"
          [cdkPortalOutlet]="content.component"
          (attached)="inputs($event, content.inputs)"
        >
        </ng-template>
      </div>
    </div>
  `,
})
export class HelpContentComponent {
  constructor(@Inject(SDS_DIALOG_DATA) public data: Data) {}

  inputs(ref: CdkPortalOutletAttachedRef, componentInputs = {}) {
    ref = ref as ComponentRef<never>;
    for (const [input, value] of Object.entries(componentInputs)) {
      ref.instance[input] = value;
    }
  }
}
