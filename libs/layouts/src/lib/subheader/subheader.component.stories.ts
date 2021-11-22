import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubHeaderWrapperMode } from './sds-subheader-wrapper.component';
import { RouterModule } from '@angular/router';
import { ComponentPortal } from '@angular/cdk/portal';
import { SdsLandingListComponent } from '../landing/list/list.component';
import { SdsSubheaderModule } from './subheader.module';
import { SdsSubheaderComponent } from './subheader.component';

export default {
  title: 'Subheader/Modes',
  component: SdsSubheaderComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        SdsSubheaderModule,
        RouterModule.forRoot([], { useHash: true }),
      ],
      providers: [],
    }),
  ],
} as Meta;

export const RequestMode: Story<SdsSubheaderComponent> = (args) => ({
  props: {
    ...args,
    clicks: action('Button Click'),
    mode: SubHeaderWrapperMode.SEARCH,
  },
  template: `
  <sds-subheader-wrapper
      [title]="'Request'"
      [mode]="mode"
      (action)="clicks($event)">
  </sds-subheader-wrapper>
  `,
});

export const RequestWithHelp: Story<SdsSubheaderComponent> = (args) => ({
  props: {
    ...args,
    help: [
      {
        head: {
          title: 'Get started searching contract opportunities',
        },
        body: {
          content: [
            {
              component: new ComponentPortal(SdsLandingListComponent),
              inputs: {
                list: {
                  iconList: true,
                  items: [
                    {
                      link: {
                        innerHtml: 'Use the search feature on SAM.gov',
                        href:
                          'https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0017298',
                        target: '_blank',
                      },
                      icon: {
                        icon: 'question-circle',
                        prefix: 'bs',
                      },
                    },
                    {
                      link: {
                        innerHtml: 'Follow contract opportunities',
                        href:
                          'https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0017560',
                        target: '_blank',
                      },
                      icon: {
                        icon: 'question-circle',
                        prefix: 'bs',
                      },
                    },
                    {
                      link: {
                        innerHtml: 'Save my searches',
                        href:
                          'https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0017561',
                        target: '_blank',
                      },
                      icon: {
                        icon: 'file-earmark',
                        prefix: 'bs',
                      },
                    },
                    {
                      link: {
                        innerHtml: 'Use the interested vendors list',
                        href:
                          'https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0017569',
                        target: '_blank',
                      },
                      icon: {
                        icon: 'question-circle',
                        prefix: 'bs',
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        head: {
          title: 'Use contract opportunities advanced search',
        },
        body: {
          content: [
            {
              component: new ComponentPortal(SdsLandingListComponent),
              inputs: {
                list: {
                  iconList: true,
                  items: [
                    {
                      link: {
                        innerHtml: 'Changing search filters',
                        href:
                          'https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0029688',
                        target: '_blank',
                      },
                      icon: {
                        icon: 'question-circle',
                        prefix: 'bs',
                      },
                    },
                    {
                      link: {
                        innerHtml: 'Filter by notice types',
                        href:
                          'https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0029689',
                        target: '_blank',
                      },
                      icon: {
                        icon: 'question-circle',
                        prefix: 'bs',
                      },
                    },
                    {
                      link: {
                        innerHtml: 'Filter by small business set-asides',
                        href:
                          'https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0029690',
                        target: '_blank',
                      },
                      icon: {
                        icon: 'question-circle',
                        prefix: 'bs',
                      },
                    },
                    {
                      link: {
                        innerHtml:
                          'Filter by product and services (NAICS and PSC)',
                        href:
                          'https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0020214',
                        target: '_blank',
                      },
                      icon: {
                        icon: 'play-btn',
                        prefix: 'bs',
                      },
                    },
                    {
                      link: {
                        innerHtml: 'Filter by place of performance',
                        href:
                          'https://www.fsd.gov/gsafsd_sp?id=kb_article_view&sysparm_article=KB0029691',
                        target: '_blank',
                      },
                      icon: {
                        icon: 'question-circle',
                        prefix: 'bs',
                      },
                    },
                    {
                      link: {
                        innerHtml: 'Search vendor collaboration opportunities',
                        routerLink:
                          '/search/?index=opp&page=1&sort=-relevance&sfm%5Bstatus%5D%5Bis_active%5D=true&sfm%5Bkeywords%5D%5B0%5D%5Bkey%5D=Vendor%20Collaboration&sfm%5Bkeywords%5D%5B0%5D%5Bvalue%5D=Vendor%20Collaboration',
                      },
                      icon: {
                        icon: 'search',
                        prefix: 'bs',
                      },
                    },
                    {
                      link: {
                        innerHtml: 'Search small business events',
                        routerLink:
                          '/search/?index=opp&page=1&sort=-relevance&sfm%5Bstatus%5D%5Bis_active%5D=true&sfm%5Bkeywords%5D%5B0%5D%5Bkey%5D=Small%20Business%20Event&sfm%5Bkeywords%5D%5B0%5D%5Bvalue%5D=Small%20Business%20Event',
                      },
                      icon: {
                        icon: 'search',
                        prefix: 'bs',
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ],
    clicks: action('Click'),
    mode: SubHeaderWrapperMode.REQUEST,
  },
  template: `
  <sds-subheader-wrapper
      [title]="'Request with help'"
      [mode]="mode"
      [help]="help"
      (action)="clicks($event)">
  </sds-subheader-wrapper>
  `,
});
RequestWithHelp.storyName = 'Request with help';

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
SearchModeWithDropdown.storyName = 'Search mode with dropdown';
