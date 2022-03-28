/* eslint-disable @typescript-eslint/no-explicit-any */
import { AfterContentInit, Component, Input } from '@angular/core';
import { SdsDialogRef } from '@gsa-sam/components';
import { SdsStepper } from '@gsa-sam/sam-formly';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sam-layouts-stepper',
  templateUrl: './stepper.component.html',
  providers: [{ provide: SdsStepper, useExisting: SLStepperComponent }],
  styles: [
    '.justify-content-space-between {justify-content: space-between; }',
    '.usa-sidenav__item--disabled {cursor: default; hover:none; opacity: 60%; pointer-events: none}',
    '.usa-step-indicator__header { border: 1px solid red; }'
  ],
})
export class SLStepperComponent extends SdsStepper implements AfterContentInit {

  @Input() hideSideNav = true;

  /**
   * @ignore
   */
  stepLabels: any = [];
  /**
   * @ignore
   */
  currentStepIndex = 0;

  /**
   * @ignore
   */
  responseDialog: SdsDialogRef<any> | undefined;

  /**
   * @ignore
   */
  onDialogOpen($event: any) {
    this.responseDialog = $event;
  }

  /**
   * @ignore
   */
  onCancelClicked() {
    if (this.responseDialog) this.responseDialog.close();
    this.responseDialog = undefined;
  }

  /**
   * @ignore
   */
  onSideNavClick() {
    if (!this.responseDialog) {
      return;
    }
    this.responseDialog.close();
    this.responseDialog = undefined;
  }

  /**
   * @ignore
   */
  ngAfterContentInit() {
    super.ngAfterContentInit();
    this.stepLabels = this.stepTemplates.map((stepTemplate, index) => {
      if (stepTemplate.id === this.currentStepId) {
        this.currentStepIndex = index;
      }
      return { ...stepTemplate, label: stepTemplate.text };
    });
  }
}
