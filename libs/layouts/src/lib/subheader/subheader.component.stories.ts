import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SdsSubheaderComponent,
  SdsSubheaderActionsComponent,
} from './subheader.component';
import {
  SdsMenuModule,
  SdsSearchModule,
  SdsAutocompleteModule,
} from '@gsa-sam/components';
import { SdsButtonGroupModule } from '@gsa-sam/sam-material-extensions';
import { IconModule } from '@gsa-sam/ngx-uswds-icons';
import {
  NgxBootstrapIconsModule,
  chevronLeft,
  threeDotsVertical,
} from 'ngx-bootstrap-icons';
import { DemoSubheaderComponent } from './subheader.demo';
import { FormsModule } from '@angular/forms';
import { AutocompleteService } from './examples/services/autocomplete.service';
import {
  SdsSubheaderWrapperComponent,
  SubHeaderWrapperMode,
} from './sds-subheader-wrapper.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

export default {
  title: 'Subheader/Modes',
  component: SdsSubheaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        SdsSubheaderComponent,
        SdsSubheaderActionsComponent,
        DemoSubheaderComponent,
        SdsSubheaderWrapperComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        SdsMenuModule,
        SdsSearchModule,
        SdsAutocompleteModule,
        IconModule,
        FormsModule,
        SdsButtonGroupModule,
        RouterModule.forRoot([], { useHash: true }),
        NgxBootstrapIconsModule.pick({ chevronLeft, threeDotsVertical }),
      ],
      providers: [
        AutocompleteService,
        { provide: APP_BASE_HREF, useValue: '/' },
      ],
    }),
  ],
} as Meta;

export const RequestMode: Story<SdsSubheaderComponent> = (args) => ({
  props: {
    ...args,
    clicks: action('Button Click'),
    mode: SubHeaderWrapperMode.REQUEST,
  },
  template: `
  <sds-subheader-wrapper
      [title]="'Request'"
      [mode]="mode"
      (action)="clicks($event)">
  </sds-subheader-wrapper>
  `,
});

export const SubmitMode: Story<SdsSubheaderComponent> = (args) => ({
  props: {
    ...args,
    clicks: action('Button Click'),
    mode: SubHeaderWrapperMode.SUBMIT,
  },
  template: `
  <sds-subheader-wrapper
      [title]="'Submit'"
      [mode]="mode"
      (action)="clicks($event)">
  </sds-subheader-wrapper>
  `,
});

export const TabsMode: Story<SdsSubheaderComponent> = (args) => ({
  props: {
    ...args,
    clicks: action('Click'),
    mode: SubHeaderWrapperMode.TAB,
    tabs: [
      { text: 'Tab 1', selected: true, id: 'tab1' },
      { text: 'Tab 2', selected: false, id: 'tab2' },
      { text: 'Tab 3', selected: false, id: 'tab3' },
    ],
  },
  template: `
  <sds-subheader-wrapper
      [title]="'Tabs'"
      [mode]="mode"
      [tabs]="tabs"
      (action)="clicks($event.value)">
  </sds-subheader-wrapper>
  `,
});

export const SearchMode: Story<SdsSubheaderComponent> = (args) => ({
  props: {
    ...args,
    clicks: action('Click'),
    mode: SubHeaderWrapperMode.CUSTOM,
  },
  template: `
  <sds-subheader-wrapper
      [title]="'Search'"
      [mode]="mode"
      [searchPlaceholderText]="'Enter an entity id'"
      [searchEnabled]="true"
      (action)="clicks($event)">
  </sds-subheader-wrapper>
  `,
});

export const SearchModeWithDropdown: Story<SdsSubheaderComponent> = (args) => ({
  props: {
    ...args,
    clicks: action('Click'),
    mode: SubHeaderWrapperMode.CUSTOM,
    searchDropDownItems: [
      { label: 'Item 1', value: 'itm1' },
      { label: 'Item 2', value: 'itm2' },
      { label: 'Item 3', value: 'itm3' },
    ],
  },
  template: `
  <sds-subheader-wrapper
      [title]="'Search Dropdown'"
      [mode]="mode"
      [searchPlaceholderText]="'Enter an entity id'"
      [searchEnabled]="true"
      [searchDropDownItems]="searchDropDownItems"
      (action)="clicks($event)">
  </sds-subheader-wrapper>
  `,
});
SearchModeWithDropdown.storyName = 'Search mode with dropdown'
