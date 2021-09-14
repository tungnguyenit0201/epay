import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import {Spacing, Images, Colors} from 'themes';
import {scale} from 'utils/Functions';
import _ from 'lodash';
import {useIconConfig} from 'context/Home/utils';
import {ListItemSimple, Row, Col, Text} from 'components';

const IconList = ({data}) => {
  const {width} = useWindowDimensions();
  let [indexTab, setIndexTab] = useState(0);
  const {iconHome} = useIconConfig();

  const flatlistRef = useRef();
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });
  const onViewRef = useRef(({viewableItems}) => {
    console.log('viewableItems :>> ', viewableItems);
    viewableItems && setIndexTab(_.get(viewableItems, '[0].index', 0));
  });
  //   const onViewableItemsChanged = ({viewableItems}) => {
  //     console.log('viewableItems :>> ', viewableItems);
  //     viewableItems && setIndexTab(_.get(viewableItems, '[0].index', 0));
  //   };
  //   const viewabilityConfig = {viewAreaCoveragePercentThreshold: 50};
  //   const viewabilityConfigCallbackPairs = useRef([
  //     {viewabilityConfig, onViewableItemsChanged},
  //   ]);

  const isFullWidth = true;
  const imageWidth = isFullWidth ? width : width - Spacing.PADDING * 2;
  const imageHeight = imageWidth / 3;
  const onPressSwitch = index => {
    flatlistRef.current.scrollToIndex({animate: true, index});
    setIndexTab(index);
  };
  const Item = ({item}) => {
    return (
      <TouchableOpacity
        key={Math.random(0, 100)}
        style={[
          styles.item,
          {
            width: width / 2 - Spacing.PADDING,
            // borderColor: Colors.black,
            // borderWidth: 1,
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

  const renderItem = ({index, item}) => {
    return (
      <View style={{width: width}} key={Math.random(0, 100)}>
        <View style={{flexDirection: 'row'}}>
          {iconHome.slice(index * 4, index * 4 + 2)?.map((item, index) => {
            // return <Item item={item} key={Math.random(0, 100)} />;
            return (
              <TouchableOpacity
                key={Math.random(0, 100)}
                style={[
                  styles.item,
                  {
                    width: width / 2 - Spacing.PADDING,
                    // borderColor: Colors.black,
                    // borderWidth: 1,
                  },
                ]}
                onPress={() => Alert.alert('', 'Coming soon')}>
                <Image source={item.icon} style={styles.icon} />

                <Text centered bold mt={5}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{flexDirection: 'row'}} key={Math.random(0, 100)}>
          {iconHome.slice(index * 4 + 2, index * 4 + 4)?.map((item, index) => {
            // return <Item item={item} />;
            return (
              <TouchableOpacity
                key={Math.random(0, 100)}
                style={[
                  styles.item,
                  {
                    width: width / 2 - Spacing.PADDING,
                    // borderColor: Colors.black,
                    // borderWidth: 1,
                  },
                ]}
                onPress={() => Alert.alert('', 'Coming soon')}>
                <Image source={item.icon} style={styles.icon} />

                <Text centered bold mt={5}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {width: width}]}>
      <FlatList
        ref={flatlistRef}
        onViewableItemsChanged={onViewRef.current}
        // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        data={[...Array(Math.ceil(iconHome?.length / 4))]}
        renderItem={renderItem}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={(item, index) => `${Math.random(0, 100)}-icon`}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled
      />
      {iconHome?.length > 4 && (
        <View
          style={[
            styles.wrapSwitch,
            {width: scale(64), left: width / 2 - scale(32)},
          ]}>
          {[...Array(Math.ceil(iconHome?.length / 4))]?.map((item, index) => (
            <TouchableOpacity
              key={`${Math.random(0, 100)}-switch`}
              style={[
                styles.wrapSwitch,
                indexTab == index && {
                  backgroundColor: Colors.cl1,
                },
                {left: index * scale(32)},
              ]}
              onPress={() => onPressSwitch(index)}></TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  item: {
    padding: Spacing.PADDING,
    alignItems: 'center',
  },

  wrapSwitch: {
    height: scale(6),
    width: scale(32),
    position: 'absolute',
    borderRadius: 15,
    backgroundColor: Colors.cl3,
  },
  icon: {
    resizeMode: 'contain',
    marginBottom: 5,
    width: scale(80),
    height: scale(80),
  },
});
export default IconList;
