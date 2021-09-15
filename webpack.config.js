const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.resolve(__dirname, './public/index.html'),
  filename: 'index.html',
  inject: 'body',
})


module.exports = {
  entry: path.join(__dirname, 'index.web.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      '@storybook/react-native': '@storybook/react',
      components: path.resolve(__dirname, 'App/Components/index'),
      utils: path.resolve(__dirname, 'App/StorybookComponents'),
      themes: path.resolve(__dirname, 'App/Themes/index'),
      navigations: path.resolve(__dirname, 'App/Navigations'),
      'utils/Functions': path.resolve(__dirname, 'App/StorybookComponents/Utils/Functions'),
      'utils/ValidationSchemas': path.resolve(__dirname, 'App/StorybookComponents/Utils/ValidationSchemas'),
      'navigations/Navigator': path.resolve(__dirname, 'App/Navigations/Navigator'),
      'images': path.resolve(__dirname, 'App/Images')
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
      }
      },{
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      }, {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' 
      }
    ],
  },
  plugins: [HTMLWebpackPluginConfig],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
}