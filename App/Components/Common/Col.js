import React from 'react';
import {View,StyleSheet} from 'react-native';


const Col = ({children,width,space}) => {
  return (
    <View style={[
      styles.col, 
      width   &&{ width: width},
      space   &&{ paddingHorizontal: space/2},
      ]} >
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  col :{
    paddingHorizontal:10,
    width: '50%'
  }

});
export default Col;
