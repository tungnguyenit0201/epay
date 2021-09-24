import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Row from '../Atoms/Row';
import Icon from '../Atoms/Icon';
import Text from '../Atoms/Text';
import {scale} from 'utils/Functions';
import {Images, Colors, base, Spacing} from 'themes';
import _ from 'lodash';

/* const Item = ({item}) => (
  <TouchableOpacity style={[styles.item]} onPress={() => console.log('hello')}>
    <Image source={item.icon.default} style={styles.icon} />

    <Text centered bold mt={5}>
      {item.name}
    </Text>
  </TouchableOpacity>
); */

const SlideIcon = ({data}) => {
  let [indexTab, setIndexTab] = useState(0);
  const width = 375;
  const flatlistRef = useRef();
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const onViewRef = useRef(({viewableItems}) => {
    viewableItems && setIndexTab(_.get(viewableItems, '[0].index', 0));
  });

  const onPressSwitch = index => {
    flatlistRef.current.scrollToIndex({animate: true, index});
    setIndexTab(index);
  };

  /* const renderItem = ({index, item}) => {
    return (
      <View style={base.container}>
        <Row>
          {data.slice(index * 4, index * 4 + 4)?.map((item, index) => {
            return (
              <Col width={width / 2} key={index} style={[{marginBottom: 10}]}>
                <Item item={item} />
              </Col>
            );
          })}
        </Row>
      </View>
    );
  }; */

  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.PADDING * 2,
      }}>
      {data.map((item, index) => (
        <TouchableOpacity
          style={[styles.item]}
          onPress={() => console.log('hello')}>
          <Image source={item.icon.default} style={styles.icon} />

          <Text centered bold mt={5}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
      <Image
        source={require('images/gradient/A_right.png').default}
        style={{
          position: 'absolute',
          bottom: '50%',
          right: 10,
          width: 9,
          height: 21,
        }}
      />
    </View>
  );
};

export default SlideIcon;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    resizeMode: 'contain',
    marginBottom: 5,
    width: scale(80),
    height: scale(80),
  },
  wrapSwitch: {
    height: scale(6),
    width: scale(32),
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: Colors.cl3,
  },
});
