import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SdsMenuModule,
  SdsSearchModule,
  SdsObserversModule,
  SdsTruncateModule,
  SdsDialogModule,
} from '@gsa-sam/components';
import {
  SdsSubheaderComponent,
  SdsSubheaderActionsComponent,
  SdsSubheaderDrawerComponent,
  SdsDrawerContentComponent
} from './subheader.component';
import { SdsSubheaderWrapperComponent } from './sds-subheader-wrapper.component';
import { SdsActionsMenuModule } from '@gsa-sam/components';
import { SdsDrawerCommunicationService } from './drawer-communication.service';
import { NgxBootstrapIconsModule, threeDotsVertical, chevronLeft } from 'ngx-bootstrap-icons';
import { IconModule } from '@gsa-sam/ngx-uswds-icons';
import { SdsButtonGroupModule } from '@gsa-sam/sam-material-extensions';
import { PortalModule } from '@angular/cdk/portal';
import { HelpContentComponent, SdsSubheaderHelpComponent } from './help.component';
import { SdsLandingListModule } from '../landing/list/list.module';

@NgModule({
  imports: [
    CommonModule,
    SdsMenuModule,
    SdsObserversModule,
    SdsSearchModule,
    SdsTruncateModule,
    SdsActionsMenuModule,
    IconModule,
    SdsButtonGroupModule,
    NgxBootstrapIconsModule.pick({threeDotsVertical, chevronLeft}),
    SdsDialogModule,
    PortalModule,
    SdsLandingListModule
  ],
  exports: [
    SdsSubheaderComponent,
    SdsSubheaderActionsComponent,
    SdsSubheaderDrawerComponent,
    SdsDrawerContentComponent,
    SdsSubheaderWrapperComponent
  ],
  declarations: [
    SdsSubheaderComponent,
    SdsSubheaderActionsComponent,
    SdsSubheaderDrawerComponent,
    SdsDrawerContentComponent,
    SdsSubheaderWrapperComponent,
    SdsSubheaderHelpComponent,
    HelpContentComponent
  ],
  providers: [SdsDrawerCommunicationService]
})
export class SdsSubheaderModule {}
