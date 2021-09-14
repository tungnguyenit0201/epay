import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ListItemSimple, Row, Col, Text} from 'components';
import {scale} from 'utils/Functions';
import Navigator from 'navigations/Navigator';
import {Images, Colors, Spacing} from 'themes';
import _ from 'lodash';
import {useIconConfig} from 'context/Home/utils';

const Item = ({item}) => {
  const {width} = useWindowDimensions();

  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          width: width / 2 - Spacing.PADDING,
          borderColor: Colors.black,
          borderWidth: 1,
        },
      ]}
      onPress={() => Alert.alert('', 'Coming soon')}>
      <Image source={item.icon} style={styles.icon} />

      <Text centered bold mt={5}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const SlideIcon = () => {
  let [indexTab, setIndexTab] = useState(0);
  const {width} = useWindowDimensions();
  const flatlistRef = useRef();
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  const {iconHome} = useIconConfig();
  const onViewRef = useRef(({viewableItems}) => {
    viewableItems && setIndexTab(_.get(viewableItems, '[0].index', 0));
  });

  const onPressSwitch = index => {
    flatlistRef.current.scrollToIndex({animate: true, index});
    setIndexTab(index);
  };

  const renderItem = ({index, item}) => {
    console.log('item :>> ', item);
    return (
      <View style={{width: width}}>
        {/* <Row>
          {iconHome.slice(index * 4, index * 4 + 4)?.map((item, index) => {
            return (
              <Col width={width / 2} key={index} style={[{marginBottom: 10}]}>
                <Item item={item} />
              </Col>
            );
          })}
        </Row> */}
        <View style={{flexDirection: 'row'}}>
          {iconHome.slice(index * 4, index * 4 + 2)?.map((item, index) => {
            return <Item item={item} />;
          })}
        </View>
        <View style={{flexDirection: 'row'}}>
          {iconHome.slice(index * 4 + 2, index * 4 + 4)?.map((item, index) => {
            return <Item item={item} />;
          })}
        </View>
        {/* <Image source={item.uri} style={{width: width}} /> */}
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={[...Array(Math.ceil(iconHome?.length / 4))]}
        // data={iconHome}
        renderItem={renderItem}
        keyExtractor={item => Math.random(1, 100)}
        showsHorizontalScrollIndicator={false}
        horizontal
        ref={flatlistRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        // pagingEnabled
      />
      {iconHome?.length > 4 && (
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
      )}
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
