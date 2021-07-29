import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, Icon, Row, Col} from 'components';
import {Colors,  Spacing} from 'themes';
import Navigator from 'navigations/Navigator';

const Content = ({data}) => {
  return (
    <Row>
      {
      data.map(item => {
        return (
          <Col  width="25%">
            <TouchableOpacity
              style={styles.item}
              key={item.screen}
              onPress={() => { Navigator.push(item.screen);  }}
            >
                <Icon
                  icon={item.icon}
                  tintColor={Colors.white}
                  size={Spacing.PADDING * 2.5}
                />
                <Text centered  mt={5} color="#fff"   >{item.name}</Text>
            </TouchableOpacity> 
          </Col>
        );
      })}
    </Row>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
  },
});

export default Content;
