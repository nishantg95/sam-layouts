import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsaStepIndicatorModule } from '@gsa-sam/ngx-uswds';
import { SdsStepperModule } from '@gsa-sam/sam-formly';
import {
  NgxBootstrapIconsModule,
  chevronLeft,
  chevronRight,
  slashCircleFill,
  checkCircleFill,
  circle,
  question,
  save,
  x,
} from 'ngx-bootstrap-icons';
import { IconModule } from '@gsa-sam/ngx-uswds-icons';
import { SdsSideToolbarModule } from '@gsa-sam/components';

import { SLStepperHeaderComponent, SLStepperHeaderCustomComponent } from './header/header.component';
import {
  SLStepperFooterComponent,
  SLStepperFooterCustomActionComponent,
} from './footer/footer.component';
import { SLStepperComponent } from './stepper.component';

@NgModule({
  declarations: [
    SLStepperComponent,
    SLStepperHeaderComponent,
    SLStepperHeaderCustomComponent,
    SLStepperFooterComponent,
    SLStepperFooterCustomActionComponent,
  ],
  imports: [
    CommonModule,
    UsaStepIndicatorModule,
    SdsStepperModule,
    NgxBootstrapIconsModule.pick({
      chevronLeft,
      chevronRight,
      circle,
      slashCircleFill,
      checkCircleFill,
      question,
      save,
      x,
    }),
    IconModule,
    SdsSideToolbarModule,
  ],
  exports: [
    SLStepperComponent,
    SLStepperHeaderComponent,
    SLStepperHeaderCustomComponent,
    SLStepperFooterCustomActionComponent,
  ],
  providers: [],
})
export class SLStepperModule {}
