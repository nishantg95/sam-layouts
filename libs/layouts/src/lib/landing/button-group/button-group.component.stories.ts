import { Meta, Story } from '@storybook/angular/types-6-0';
import { SdsLandingButtonGroupComponent } from './button-group.component';

export default {
  title: 'Landing/Button Group',
  component: SdsLandingButtonGroupComponent,
  argTypes: {
    buttons: {
      description: 'Array of button objects',
      type: { required: true },
      table: {
        type: {
          summary: 'array',
          detail: 'array of button objects'
        },
        defaultValue: {
          summary: 'undefined'
        }
      }
    }
  },
  parameters: {
    actions: {
      handles: ['click .usa-button'],
    },
    docs : {
      description: {
        component: '_Button Group_ for the landing page',
      },
    }
  },
} as Meta;

const Template: Story<SdsLandingButtonGroupComponent> = (args) => ({
  props: args,
});

export const ButtonGroup = Template.bind({});
ButtonGroup.args = {
  buttons: [
    {
      text: 'Lorem ipsum dolor sit amet',
      url: '/test',
      external: true,
      clickHandler: () => console.log('click'),
    },
    {
      text: 'Consectetur adipiscing elit',
      url: './test',
      external: true,
      classes: ['usa-button--secondary'],
    },
  ],
};
