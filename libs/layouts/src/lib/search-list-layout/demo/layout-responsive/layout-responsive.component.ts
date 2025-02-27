import {
  AfterViewInit,
  Component,
  HostListener,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NavigationLink,
  SdsDialogConfig,
  SdsDialogRef,
  SelectionPanelModel,
} from '@gsa-sam/components';
import {
  ResultsModel,
  SearchListConfiguration,
} from '../../model/search-list-layout.model';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BehaviorSubject, timer } from 'rxjs';
import { DataService } from '../data.service';
import { FilterService } from '../filter.service';
import { navigationConfig } from '../navigate.config';
import { debounce, filter, pairwise, tap } from 'rxjs/operators';

@Component({
  selector: 'demo-search-list-layout',
  templateUrl: './layout-responsive.component.html',
})
export class LayoutResponsiveComponent implements AfterViewInit {
  @ViewChild('resultList') resultList;
  @ViewChild('filters') filterComponent;

  isMobileMode: boolean;
  mobileDialog: SdsDialogRef<any>;

  fields: FormlyFieldConfig[] = [];
  form;
  filterModel = {};
  options;
  filtersExpanded = true;
  domainsExpanded = false;
  responsiveDialogOptions: SdsDialogConfig = {
    ariaLabel: 'Search Filters',
  };

  public filterChange$ = new BehaviorSubject<object>([]);
  public navigationModel: SelectionPanelModel = {
    navigationLinks: navigationConfig.navigationLinks,
    selectionMode: 'SELECTION',
  };

  public filterPanelConfig;

  selectedPanel: NavigationLink = this.navigationModel.navigationLinks[1];

  listConfig: SearchListConfiguration = {
    defaultSortValue: 'legalBusinessName',
    pageSize: 25,
    sortList: [
      { text: 'Entity Name', value: 'legalBusinessName' },
      { text: 'Status', value: 'registrationStatus' },
    ],
  };

  /* Sort config change demo */
  defaultListConfig: SearchListConfiguration = {
    defaultSortValue: 'legalBusinessName',
    pageSize: 25,
    sortList: [
      { text: 'Entity Name', value: 'legalBusinessName' },
      { text: 'Status', value: 'registrationStatus' },
    ],
  };

  updatedListConfig: SearchListConfiguration = {
    defaultSortValue: 'cageCode',
    pageSize: 25,
    sortList: [
      { text: 'Entity Name', value: 'legalBusinessName' },
      { text: 'Cage Code', value: 'cageCode' },
      { text: 'Status', value: 'registrationStatus' },
    ],
  };

  constructor(
    public service: DataService,
    public filterService: FilterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fields = this.filterService.fields;
    this.filterModel = this.filterService.model;
    this.form = this.filterService.form;
    this.options = this.filterService.options;

    this.filterPanelConfig = {
      title: 'Filter By',
      fields: this.fields,
      model: this.filterModel,
      form: this.form,
      options: this.options,
      isHistoryEnabled: true,
      advancedFilters: true,
    };
  }

  ngAfterViewInit() {
    const debounceTime = 2000;

    const filters$ = this.filterChange$.pipe(
      pairwise(),
      filter(([prev, curr]: any) => {
        if (
          curr.keyword &&
          curr.keyword.keywordTags &&
          curr.keyword.keywordTags.length > 0
        )
          return true;
        if (Array.isArray(prev)) return false;
        return (
          prev.keyword.keywordRadio === curr.keyword.keywordRadio &&
          prev.keyword.keywordExactPhrase === curr.keyword.keywordExactPhrase
        );
      }),
      debounce(([prev, curr]) =>
        curr.keyword &&
        curr.keyword.keywordTextarea &&
        curr.keyword.keywordTextarea.length > 0
          ? timer(debounceTime)
          : timer(0)
      )
    );

    filters$.subscribe((model) => {
      this.resultList.updateFilter(model);
    });

    // Listen for radio change and refresh autocomplete
    const keywordGroup = this.fields.find((field) => field.key === 'keyword')
      .fieldArray.fieldGroup[0].fieldGroup;

    keywordGroup
      .find((keyword) => keyword.key === 'keywordRadio')
      .formControl.valueChanges.subscribe((change) => {
        // Refresh autocomplete chips - we do set timeout so that our model for radio option can update first, then
        // this refresh will update our chips depending on the updated model value
        setTimeout(() => {
          this.filterService.keywordChangeSubject.next({});
        });
      });
  }

  updateConfig(update: boolean) {
    if (update) {
      this.listConfig = { ...this.updatedListConfig };
    } else {
      this.listConfig = { ...this.defaultListConfig };
    }
    const newSortValue = this.listConfig.defaultSortValue;
    this.resultList.updateSearchResultsModel({
      sort: newSortValue,
      filterModel: this.filterModel,
    });
  }

  onDialogOpen($event) {
    this.mobileDialog = $event;
  }

  onCancelClicked() {
    this.mobileDialog.close();
    this.mobileDialog = undefined;
  }

  onSearchModelUpdate() {
    const model: ResultsModel = {
      page: 2,
      sort: 'registrationStatus',
      filterModel: {
        keyword: {
          keywordRadio: 'allWords',
          keywordTags: [
            {
              key: 'te',
              text: 'te',
            },
          ],
        },
        location: {
          city: null,
          congressionalDistrict: null,
          country: null,
          state: [{ id: 'AL', name: 'Alabama', subtext: undefined }],
          zipCode: null,
        },
      },
    };

    this.fields[0].fieldArray.fieldGroup[0].form.setValue(
      model.filterModel.keyword
    );
    this.resultList.updateSearchResultsModel(model);
  }

  onApplyFilter() {
    this.mobileDialog.close();
    this.mobileDialog = undefined;
    console.log('Applied Filters', this.filterModel);
  }

  onPanelSelection($event: NavigationLink) {
    this.selectedPanel = $event;
    this.domainsExpanded = false;
    this.filtersExpanded = true;
    console.log('Selected Domain', $event);
    this.router.navigate([], {
      queryParams: $event.queryParams,
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }

  onSubPanelClicked($event: NavigationLink) {
    console.log('Sub Domain selected', $event);
    this.router.navigate([], {
      queryParams: $event.queryParams,
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }
}
