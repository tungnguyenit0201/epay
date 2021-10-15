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
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useIconConfig} from 'context/Home/utils';
import {ListItemSimple, Row, Col, Text, Modal} from 'components';
import {useError} from 'context/Common/utils';

const IconList = ({data}) => {
  const [open, setOpen] = useState(false);
  const {width} = useWindowDimensions();
  let [indexTab, setIndexTab] = useState(0);
  const {iconHome} = useIconConfig();
  const {setError} = useError();

  const flatlistRef = useRef();
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });
  const onViewRef = useRef(({viewableItems}) => {
    viewableItems && setIndexTab(_.get(viewableItems, '[0].index', 0));
  });

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
      <>
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
                    },
                  ]}
                  onPress={() => setOpen(true)}>
                  <Image source={item.icon} style={styles.icon} />

                  <Text centered bold mt={5}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{flexDirection: 'row'}} key={Math.random(0, 100)}>
            {iconHome
              .slice(index * 4 + 2, index * 4 + 4)
              ?.map((item, index) => {
                // return <Item item={item} />;
                return (
                  <TouchableOpacity
                    key={Math.random(0, 100)}
                    style={[
                      styles.item,
                      {
                        width: width / 2 - Spacing.PADDING,
                      },
                    ]}
                    onPress={() => {
                      // Alert.alert('', 'Coming soon')
                      Navigator.navigate(SCREEN.TRAFFIC_FEE);
                    }}>
                    <Image source={item.icon} style={styles.icon} />

                    <Text centered bold mt={5}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
        <Modal
          visible={open}
          onClose={() => setOpen(false)}
          content="Coming soon"
          buttonGroup={() => (
            <View>
              <Text></Text>
            </View>
          )}
          icon={Images.Homes.Setting}
          // icon={Images.SignUp.BigPhone}
        />
      </>
    );
  };

  return (
    <View style={[styles.container, {width: width}]}>
      <FlatList
        ref={flatlistRef}
        onViewableItemsChanged={onViewRef.current}
        data={[...Array(Math.ceil(iconHome?.length / 4))]}
        renderItem={renderItem}
        viewabilityConfig={viewConfigRef.current}
        keyExtractor={(item, index) => `${Math.random(0, 100)}-icon`}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        pagingEnabled
      />
      {iconHome?.length > 4 && (
        <View style={[styles.controls]}>
          {[...Array(Math.ceil(iconHome?.length / 4))]?.map((item, index) => (
            <TouchableOpacity
              key={`${Math.random(0, 100)}-switch`}
              style={[
                styles.dot,
                indexTab == index && {
                  backgroundColor: Colors.cl1,
                },
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
    paddingTop: Spacing.PADDING,
    paddingHorizontal: Spacing.PADDING,
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
    width: scale(80),
    height: scale(80),
  },
  controls: {
    width: scale(64),
    height: scale(6),
    backgroundColor: Colors.cl3,
    marginTop: Spacing.PADDING / 2,
    marginLeft: -scale(32) - Spacing.PADDING / 2,
    flexDirection: 'row',
    borderRadius: 15,
    overflow: 'hidden',
  },

  dot: {
    height: 6,
    width: scale(32),
    backgroundColor: Colors.cl3,
  },
});
export default React.memo(IconList);
