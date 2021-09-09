const custom = require('../webpack.config.js');
module.exports = {
  stories: [
    '../App/StorybookComponents/Atoms/*.stories.[tj]s',
    // '../App/StorybookComponents/Groups/*.stories.[tj]s',
    // '../App/StorybookComponents/Groups/**/*.stories.[tj]s',
    // '../App/StorybookComponents/Containers/**/*.stories.[tj]s'
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
  ],
  previewHead: (head) => (`
    ${head}
    <style>
      #main {
        background-color: yellow;
      };
      @font-face {
        font-family: "SVN-Gilroy";
        src: url("/fonts/SVN-Gilroy.ttf");
      }
    </style>
  `)
}