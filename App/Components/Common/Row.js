import React from 'react';
import {View,StyleSheet} from 'react-native';


const Row = ({children,align,space,justify,wrap,direction}) => {
  return (
    <View style={[
      styles.row, 
      align     &&{ alignItems: align},
      justify   &&{ justifyContent: justify},
      wrap      &&{ flexWrap: wrap},
      direction &&{ flexDirection: direction},
      space     &&{ marginHorizontal: -space/2},
      ]} >
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  row :{
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal:-10
  }

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