import { CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import {
  Component,
  ComponentRef,
  Inject,
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
import { filter } from 'rxjs/operators';
import { AutocompleteService } from '../subheader/examples/services/autocomplete.service';

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
    public service: AutocompleteService,
    @Inject(SDS_DIALOG_DATA) public data: Data
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.dialogRef.close();
      });
      this.setup();
  }
    public settings = new SDSAutocompletelConfiguration();
    public model = new SDSSelectedItemModel();
    changes(value) {
      console.log(value);
    }
    setup() {
      this.settings.id = 'autocompleteBasic';
      this.settings.primaryKeyField = 'id';
      this.settings.primaryTextField = 'name';
      this.settings.secondaryTextField = 'subtext';
      this.settings.labelText = 'Autocomplete 1';
      this.settings.selectionMode = SelectionMode.SINGLE;
      this.settings.autocompletePlaceHolderText = 'eg: Level 1';
    }
    

  inputs(ref: CdkPortalOutletAttachedRef, componentInputs = {}) {
    ref = ref as ComponentRef<never>;
    for (const [input, value] of Object.entries(componentInputs)) {
      ref.instance[input] = value;
    }
  }
}
