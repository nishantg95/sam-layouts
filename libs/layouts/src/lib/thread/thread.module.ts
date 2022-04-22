import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SdsFormlyModule } from '@gsa-sam/sam-formly';
import { FormlyModule } from '@ngx-formly/core';
import { SdsToastModule } from '@gsa-sam/components';
import { SystemConfig } from './thread-config-model';
import { GenericThreadComponent } from './thread.component';
import { GenericThreadService } from './thread.service';
import { ThreadMockService } from './thread-mock.service';


@NgModule({
  declarations: [
    GenericThreadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      wrappers: [

      ],
    }),
    SdsFormlyModule,
    SdsToastModule,
  ],
  exports: [
    GenericThreadComponent
  ],
  providers: [GenericThreadService, ThreadMockService]
})

export class GenericThreadModule {

  static forRoot(config: SystemConfig): ModuleWithProviders<GenericThreadModule> {
    return {
      ngModule: GenericThreadModule,
      providers: [
        { provide: SystemConfig, useValue: config }
      ]
    };
  }
}

