import React from 'react';
import {scale} from 'utils/Functions';
import {View, StyleSheet} from 'react-native';

const Row = ({children, align, space, justify, wrap, direction, style}) => {
  return (
    <View
      style={[
        styles.row,
        align && {alignItems: align},
        justify && {justifyContent: justify},
        wrap && {flexWrap: wrap},
        direction && {flexDirection: direction},
        space && {marginHorizontal: scale(-space / 2)},
        style,
      ]}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: scale(-10),
  },
});
export default Row;

/*
  <Row >
    <Col >
      <Text style={[{backgroundColor:'#000'}]}> 
        I am bold đa Á
      </Text>
    </Col>
    <Col>
    <Text style={[{backgroundColor:'#000'}]}> 
        I am bold đa Á  I am bold đa Á I am bold đa Á  I am bold đa Á I am bold đa Á  I am bold đa Á
      </Text>
    </Col>          
  </Row>
*/
