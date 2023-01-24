import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectionMode } from '@gsa-sam/components';
import { SearchListConfiguration } from '@gsa-sam/layouts';
import {
  SdsFormlyTypes,
  SDSFormlyUpdateComunicationService,
} from '@gsa-sam/sam-formly';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { BehaviorSubject } from 'rxjs';
import { FilterSearchService } from './filter-search.service';

@Component({
  selector: 'sam-layouts-filter-search',
  templateUrl: 'filter-search.component.html',
})
export class FilterSearchComponent implements OnInit {
  @ViewChild('resultList') resultList;

  public filterPanelConfig;
  public filterChange$ = new BehaviorSubject([]);

  public enableApiCall = true;
  public listConfig: SearchListConfiguration = {
    defaultFilterValue: {
      keyword: { keywordRadio: 'anyWords' },
    },
    defaultSortValue: 'name',
    pageSize: 25,
    sortList: [
      { text: 'Entity Name', value: 'legalBusinessName' },
      { text: 'Status', value: 'registrationStatus' },
    ],
    excludeFilterFields: [
      {
        field: 'keyword.keywordRadio',
        unless: (m) =>
          m.keyword.keywordTags && m.keyword.keywordTags.length > 0,
      },
    ],
  };

  public form = new FormGroup({});
  public model = {};
  public fields: FormlyFieldConfig[] = [
    {
      key: 'keyword',
      wrappers: ['tabs'],
      templateOptions: {
        label: 'Keyword Search',
        description: `For more information on how to use our keyword search, visit our <a href="#"> help guide </a>`,
        hideOptional: true,
      },
      fieldArray: {
        fieldGroup: [
          // TAB 1
          //===============================================================
          {
            templateOptions: {
              tabHeader: 'Simple Search',
            },
            fieldGroupClassName: 'grid-row',
            fieldGroup: [
              {
                key: 'keywordRadio',
                className: 'grid-col-5',
                type: 'radio',
                defaultValue: 'anyWords',
                templateOptions: {
                  options: [
                    {
                      label: 'Any Words',
                      value: 'anyWords',
                    },
                    {
                      label: 'All Words',
                      value: 'allWords',
                    },
                  ],
                },
              },
              {
                className: 'grid-col-6',
                key: 'keywordExactPhrase',
                type: 'checkbox',
                templateOptions: {
                  label: 'Exact Phrase',
                  hideOptional: true,
                },
              },
              {
                key: 'keywordTags',
                type: 'autocomplete',
                className: 'grid-col-12',
                templateOptions: {
                  expand: false,
                  configuration: {
                    id: 'keyword',
                    primaryKeyField: 'key',
                    primaryTextField: 'text',
                    labelText: 'Search Keyword',
                    selectionMode: SelectionMode.MULTIPLE,
                    autocompletePlaceHolderText: '',
                    isTagModeEnabled: true,
                  },
                },
              },
            ],
          },
          //TAB 2
          //===============================================================
          {
            templateOptions: {
              tabHeader: 'Search Editor',
            },
            fieldGroup: [
              {
                key: 'keywordTextarea',
                id: 'keyword-textarea',
                type: SdsFormlyTypes.TEXTAREA,
                className: 'display-block padding-left-2 padding-right-2',
                templateOptions: {
                  placeholder:
                    'e.g. ((rental AND property) OR (lease and property) AND NOT ( "short term"))',
                },
              },
            ],
          },
        ],
      },
    },
  ];

  constructor(
    public service: FilterSearchService 
    // private formlyService: SDSFormlyUpdateComunicationService
  ) {
    // this.formlyService.filterUpdate.subscribe((data) => {
    //   console.log('Formly Service:', data);
    // });
  }

  ngOnInit() {
    const options: FormlyFormOptions = {
      formState: {},
    };

    this.filterPanelConfig = {
      title: 'Filter By',
      fields: this.fields,
      model: this.model,
      form: this.form,
      options: options,
      isHistoryEnabled: true,
      advancedFilters: true,
    };
  }
}
