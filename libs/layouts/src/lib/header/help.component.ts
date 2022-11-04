import { CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ComponentRef,
  Inject,
  Injectable,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  SDSAutocompletelConfiguration,
  SdsDialogRef,
  SdsDialogService,
  SDSSelectedItemModel,
  SDS_DIALOG_DATA,
  SelectionMode,
} from '@gsa-sam/components';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AutocompleteService } from '../subheader/examples/services/autocomplete.service';

interface Data {
  help: [];
}

@Injectable()
export class FsdApiService {
  private readonly url = '/api/now/sp/search';
  private readonly headers = new HttpHeaders()
  .append('Content-Type', 'application/json')
  .append('Accept', 'application/json')
  // .append('Access-Control-Allow-Headers', 'Content-Type')
  // .append('Access-Control-Allow-Methods', 'POST')
  // .append('Access-Control-Allow-Origin', '*');
  private body = {
      "query": "re",
      // "portal": "8b1c5a9fdb411c14c82370c08c9619c6",
      // "page": "gsa_search",
      // "source": [
      //     "gsa_kb",
      //     "my_incidents"
      // ],
      // "include_facets": false,
      // "searchType": "typeahead"
  }
  

  constructor( private httpClient : HttpClient){
  }
  getSearchResults(keyword: string): Observable<any>{
    this.body.query = keyword;
    return this.httpClient.post(this.url, this.body, {headers: this.headers});
  }
}


@Component({
  selector: 'sds-header-help',
  styleUrls: ['./help.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      class="usa-button usa-button--unstyled"
      (click)="openSlidePanel()"
      matTooltipClass="help-tooltip"
      matTooltip="Find help articles for features on this page"
      title="Find help articles for features on this page"
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
  @Input() autocomplete;

  openedDialogRef: SdsDialogRef<any>;

  constructor(public dialog: SdsDialogService) {}

  openSlidePanel() {

    if(this.autocomplete){
      this.openedDialogRef = this.dialog.open(HelpContentComponentAutocomplete, {
        hasBackdrop: false,
        height: '100%',
        position: { right: 'true' },
        slideOut: {
          width: '20rem',
          time: '350ms',
        },
        data: {
          help: this.content,
          autocomplete: this.autocomplete
        },
      });
    }
    else{
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
          autocomplete: this.autocomplete
        },
      });
    }
  }

}

@Component({
  template: `
    <div
      class="help-slide-out bg-base-lighter minh-full padding-x-2 padding-top-2"
    >
      <h2 class="font-heading-lg text-semibold">Help</h2>

      <sds-autocomplete
      [service]="service"
      (ngModelChange)="changes($event)"
      [(ngModel)]="model"
      [configuration]="settings"

    >
    </sds-autocomplete>
      <div *ngIf="model.length === 0">
        <div *ngFor="let item of data.help">
          <h3
            class="font-heading-md text-semibold margin-top-205 margin-bottom-1"
          >
            {{ item.head.title }}
          </h3>
          <ng-template
            *ngFor="let content of item.body.content"
            [cdkPortalOutlet]="content.component"
            (attached)="inputs($event, content.inputs)"
          >
          </ng-template>
        </div>
      </div>

      <div *ngIf="model.length !== 0" class="padding-y-2">
        <button class="usa-button" (click)="resetModel()">Go Back</button>
        <h3>{{model[0].title}}</h3>
        <p>{{model[0].text}}</p>
      </div>

    </div>
  `,
  styles: ['.help-slide-out .sds-list .usa-link:hover { color: #625028; }'], // 508: Contrast fix
  encapsulation: ViewEncapsulation.None,
})
export class HelpContentComponentAutocomplete {

  constructor(
    private router: Router,
    public dialogRef: SdsDialogRef<HelpContentComponentAutocomplete>,
    public service: AutocompleteService,
    public fsdService : FsdApiService,
    @Inject(SDS_DIALOG_DATA) public data: Data,
    
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.dialogRef.close();
      });
      this.setup();
  }
    public settings = new SDSAutocompletelConfiguration();
    public model = [];
    changes(value) {
      console.log(value);
      // this.dialogRef._containerInstance._config.slideOut['width'] = '40rem';
      // console.log(this.dialogRef._containerInstance._config.slideOut['width']);
      this.fsdService.getSearchResults(value).subscribe(response => {
        console.log('api',response);
      })
    }
    setup() {
      this.settings.id = 'autocompleteBasic';
      this.settings.primaryKeyField = 'id';
      this.settings.primaryTextField = 'title';
      this.settings.secondaryTextField = 'text';
      this.settings.labelText = 'Autocomplete 1';
      this.settings.selectionMode = SelectionMode.SINGLE;
      this.settings.autocompletePlaceHolderText = 'eg: Entity Registration';
      // console.log(this.data);
      
    }
    resetModel(){
      this.model = [];
    }
    

  inputs(ref: CdkPortalOutletAttachedRef, componentInputs = {}) {
    ref = ref as ComponentRef<never>;
    for (const [input, value] of Object.entries(componentInputs)) {
      ref.instance[input] = value;
    }
  }
}


@Component({
  template: `
    <div
      class="help-slide-out bg-base-lighter minh-full padding-x-2 padding-top-2"
    >
      <h2 class="font-heading-lg text-semibold">Help</h2>


      <div *ngFor="let item of data.help">
        <h3
          class="font-heading-md text-semibold margin-top-205 margin-bottom-1"
        >
          {{ item.head.title }}
        </h3>
        <ng-template
          *ngFor="let content of item.body.content"
          [cdkPortalOutlet]="content.component"
          (attached)="inputs($event, content.inputs)"
        >
        </ng-template>
      </div>
    </div>
  `,
  styles: ['.help-slide-out .sds-list .usa-link:hover { color: #625028; }'], // 508: Contrast fix
  encapsulation: ViewEncapsulation.None,
})
export class HelpContentComponent {

  constructor(
    private router: Router,
    public dialogRef: SdsDialogRef<HelpContentComponent>,
    @Inject(SDS_DIALOG_DATA) public data: Data,
    
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }


  inputs(ref: CdkPortalOutletAttachedRef, componentInputs = {}) {
    ref = ref as ComponentRef<never>;
    for (const [input, value] of Object.entries(componentInputs)) {
      ref.instance[input] = value;
    }
  }
}