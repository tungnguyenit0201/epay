import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,Dimensions
} from 'react-native';
import {Text, Icon, Row, Col} from 'components';
import {Colors,  Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import { View } from 'react-native-ui-lib';

const Content = ({data,layout,col}) => {
  const _screenWidth = Math.min(
    Dimensions.get('window').width,
    Dimensions.get('window').height,
  );  

  console.log(_screenWidth);
 
  const renderItem = ({ item }) => (
    <View style={{width:150}} >
      <TouchableOpacity
        style={styles.item}
        onPress={() => { Navigator.push(item.screen);  }}
      >
        <Icon
          icon={item.icon}
          //tintColor={Colors.white}
          size={Spacing.PADDING * 2.5}
        />
        <Text centered  mt={5}    >{item.name}</Text>
      </TouchableOpacity> 
    </View>
  );

  return (
  <>
    {col>1 ?  (
      <Row>
        {
        data.map((item,index) => {
          return (
            <Col  width={`${100/col}%`}  key={index} style={{}}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => { Navigator.push(item.screen);  }}
              >
                <Icon
                  icon={item.icon}
                  //tintColor={Colors.white}
                  size={Spacing.PADDING * 2.5}
                />
                <Text centered  mt={5}    >{item.name}</Text>
              </TouchableOpacity> 
            </Col>
          );
        })}
      </Row>
    ) : (
      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      //showsHorizontalScrollIndicator={true}
      horizontal={true}
    />  
   )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center'
  },
});

export default Content;
