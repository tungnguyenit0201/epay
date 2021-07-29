import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Text, Icon, Row, Col} from 'components';
import {Colors,  Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import { View } from 'react-native-ui-lib';

const Content = ({data,layout}) => {
 
  const renderItem = ({ item }) => (
    <View style={{width:150}} key={item.screen}>
      <TouchableOpacity
        style={styles.item}
        key={item.screen}
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

  return (<>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.name}
      //showsHorizontalScrollIndicator={true}
      //horizontal={true}
    />   

    <Row>
      {
      data.map((item,index) => {
        return (
          <Col  width="25%" key={index}>
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
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
});

export default Content;
