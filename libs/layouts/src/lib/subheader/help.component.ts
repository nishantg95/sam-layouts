import { CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { Component, ComponentRef, Inject, Input } from '@angular/core';
import {
  SdsDialogRef,
  SdsDialogService,
  SDS_DIALOG_DATA,
} from '@gsa-sam/components';

interface Data {
  help: [];
}
@Component({
  selector: 'sds-subheader-help',
  template: `
    <div class="tablet:margin-right-5 text-right">
      <button
        class="usa-button
          text-white text-semibold
          radius-0 tablet:radius-bottom-lg
          border-transparent
          bg-accent-cool-darker
          padding-y-05 padding-x-5
          width-full tablet:width-15"
        (click)="openSlidePanel()"
      >
        Help
      </button>
    </div>
  `,
})
export class SdsSubheaderHelpComponent {
  @Input() content;

  openedDialogRef: SdsDialogRef<HelpContentComponent>;

  constructor(public dialog: SdsDialogService) {}

  openSlidePanel() {
    this.openedDialogRef = this.dialog.open(HelpContentComponent, {
      hasBackdrop: false,
      height: '100%',
      position: { right: 'true' },
      slideOut: true,
      data: {
        help: this.content,
      },
    });
  }
}

@Component({
  template: `
    <div class="bg-base-lighter height-full padding-x-2 padding-top-2">
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
