const custom = require('../webpack.config.js');
module.exports = {
  // stories: ['../App/Components/Common/**/*.stories.[tj]s'],
  stories: [
    '../App/Components/Common/Accordion.stories.js',
    '../App/Components/Common/Button.stories.js',
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: { alias: { ...config.resolve.alias, ...custom.resolve.alias } },
      module: { ...config.module, rules: custom.module.rules },
    }
  },
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-knobs/',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-notes',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
  ]
}