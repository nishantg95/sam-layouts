const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,

  stories: [
    ...rootMain.stories,
    '../src/app/**/*.stories.mdx',
    '../src/app/**/*.stories.@(js|jsx|ts|tsx)',
    '../../../libs/layouts/src/lib/**/*.stories.mdx',
    '../../../libs/layouts/src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  addons: [...rootMain.addons],
};
