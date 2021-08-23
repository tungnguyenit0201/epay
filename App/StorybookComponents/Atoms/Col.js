import React from 'react';
import {scale} from 'utils/Functions';
import {View,StyleSheet} from 'react-native';


const Col = ({children,width,space,style}) => {
  return (
    <View style={[
      styles.col, 
      width   &&{ width: width},
      space   &&{ paddingHorizontal: scale(space/2)},
      style
      ]} >
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  col :{
    paddingHorizontal:scale(10),
    width: '50%'
  }

});
export default Col;
