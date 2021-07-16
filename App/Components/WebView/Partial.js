import React from 'react';
import {View, Platform} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {Placeholder, PlaceholderLine, Shine} from 'rn-placeholder';
import {Colors, Fonts} from 'themes';

var css = `
  *{
    font-family: UTM Neo Sans Intel !important;
    font-size: ${Fonts.FONT_MEDIUM} !important;
    color: ${Colors.TEXT} !important
  }
  
  body {
    // white-space: pre-wrap; 
   }
  p { max-width: 100% !important }
  .content{ padding: 5px 10px 40px !important }
  img { max-width: 100% !important }
  table, tr, td {
    border: 1px solid ${Colors.BORDER};
    border-collapse: collapse;
  }`;

const preProcess = html => html.replace(/\n/g, '<br/>'); // html?.replace(/width: ?\d+px/gi, '');

const formatHTML = (content, isFormat) => `<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
    />
    <link href="https://lms-fonts.internal.mangoads.com.vn/stylesheet.css" rel="stylesheet">
    <style>
   ${css}
    </style>
  </head>
  <body>
    ${!!isFormat ? preProcess(content) : content}
  </body>
</html>`;
export default class _WebView extends React.Component {
  state = {
    loading: true,
    width: 0,
  };

  onLoadEnd = () => {
    this.setState({loading: false});
  };

  _onLayout = event => {
    const width = event.nativeEvent.layout.width;
    this.setState({width});
  };

  render() {
    const {source, style, isFormat} = this.props;
    const {loading, width} = this.state;

    return (
      <View onLayout={this._onLayout} style={[{}, style]}>
        {loading && (
          <View>
            <Placeholder Animation={Shine}>
              <PlaceholderLine width={70} />
              <PlaceholderLine />
              <PlaceholderLine width={30} />
            </Placeholder>
          </View>
        )}
        {width !== 0 && (
          <AutoHeightWebView
            useWebKit
            source={{html: formatHTML(source.html, isFormat)}}
            style={{width}}
            startInLoadingState={true}
            zoomable={false}
            scrollEnabled={false}
            onLoadEnd={this.onLoadEnd}
          />
        )}
      </View>
    );
  }
}
