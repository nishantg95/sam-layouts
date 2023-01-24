import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchListServiceModule } from '@gsa-sam/layouts';
import { SdsFiltersModule, SDSFormlyUpdateComunicationService } from '@gsa-sam/sam-formly';
import { FilterSearchComponent } from './filter-search.component';

const routes: Routes = [
  {
    path: '',
    component: FilterSearchComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SdsFiltersModule,
    SearchListServiceModule
  ],
  exports: [],
  declarations: [FilterSearchComponent],
  providers: [
    SDSFormlyUpdateComunicationService
  ],
})
export class FilterSearchModule {}
