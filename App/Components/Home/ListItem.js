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
import {scale} from 'utils/Functions';

const ListItem = ({data,scroll,col,space,width}) => {
  const _screenWidth = Math.min(
    Dimensions.get('window').width,
    //Dimensions.get('window').height,
  );  
  const screenContent = _screenWidth - Spacing.PADDING*2;

  const Item = ({ title,icon,screen }) => (
    <TouchableOpacity
    style={styles.item}
    onPress={() => { Navigator.push(screen);  }}
    >
      <Icon
        icon={icon}
        //tintColor={Colors.white}
        size={Spacing.PADDING * 2.5}
      />
      <Text centered  mt={5} >{title}</Text>
    </TouchableOpacity> 
  );
 
  const renderItem = ({ item,index }) => (
    <View style={[
      col>1 &&{width:scale((screenContent-(col-1)*space)/col)},
      width &&{width:scale(width)},
      space &&{marginBottom:scale(space)},
      index &&{marginLeft:scale(space)}
      ]} >
      <Item title={item.name} icon={item.icon} screen={item.screen} />
    </View>
  );

  return (
  <>
    {scroll ?  (
      <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.name}
      //showsHorizontalScrollIndicator={true}
      horizontal={true}
    />     
    ) : (       
      <Row space={space}>
        {
        data.map((item,index) => {
          return (
            <Col  width={`${100/col}%`} space={space}  key={index} style={[space &&{marginBottom:space}]}>
              <Item title={item.name} icon={item.icon} screen={item.screen} /> 
            </Col>
          );
        })}
      </Row>
   )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    //height:'100%'
  },
});

export default ListItem;
