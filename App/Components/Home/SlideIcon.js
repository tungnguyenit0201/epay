import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {ListItemSimple, Row, Col, Text} from 'components';
import {scale} from 'utils/Functions';
import Navigator from 'navigations/Navigator';
import {Images, Colors} from 'themes';
import _ from 'lodash';

const Item = ({item}) => (
  <TouchableOpacity
    style={[styles.item]}
    onPress={() => Navigator.navigate(item.screen)}>
    <Image source={item.icon} style={styles.icon} />

    <Text centered bold mt={5}>
      {item.name}
    </Text>
  </TouchableOpacity>
);

const SlideIcon = ({data}) => {
  let [indexTab, setIndexTab] = useState(0);
  const {width} = useWindowDimensions();
  const flatlistRef = useRef();
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const onViewRef = useRef(({viewableItems}) => {
    viewableItems && setIndexTab(_.get(viewableItems, '[0].index', 0));
  });

  const onPressSwitch = index => {
    flatlistRef.current.scrollToIndex({animate: true, index});
    setIndexTab(index);
  };

  const renderItem = ({index, item}) => {
    return (
      <View style={{width: width}}>
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
  };

  return (
    <>
      <FlatList
        data={[...Array(Math.ceil(data?.length / 4))]}
        renderItem={renderItem}
        keyExtractor={item => Math.random(1, 100)}
        showsHorizontalScrollIndicator={false}
        horizontal
        ref={flatlistRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        pagingEnabled
      />
      <View
        style={[
          styles.wrapSwitch,
          {width: scale(64), left: width / 2 - scale(32)},
        ]}>
        <TouchableOpacity
          style={[
            styles.wrapSwitch,
            indexTab == 0 && {backgroundColor: Colors.cl1},
          ]}
          onPress={() => onPressSwitch(0)}></TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.wrapSwitch,
            indexTab == 1 && {backgroundColor: Colors.cl1},
            {left: scale(32)},
          ]}
          onPress={() => onPressSwitch(1)}></TouchableOpacity>
      </View>
    </>
  );
};

export default SlideIcon;

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
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
