const customViewports = {
  kindleFireHD: {
    name: 'Kindle Fire HD',
    styles: {
      width: '400px',
      height: '900px',
    },
  },
};
export const parameters = {
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: customViewports, // newViewports would be an ViewportMap. (see below for examples)
    defaultViewport: 'kindleFireHD',
  },
};
