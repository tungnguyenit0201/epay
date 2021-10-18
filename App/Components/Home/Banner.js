import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  View,
} from 'react-native';
import {scale} from 'utils/Functions';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {Text} from 'components';
import Navigator from 'navigations/Navigator';

const Banner = ({
  data,
  space = 10,
  width = 300,
  style,
  styleItem,
  styleImg,
}) => {
  const openLink = async url => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  const renderItem = ({item, index}) => (
    <View
      key={`${Math.random(1, 100)}-banner`}
      style={[
        index && {marginLeft: scale(space)},
        {
          width: scale(width),
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.item, styleItem]}
        onPress={() => openLink(item?.RedirectUrl)}
      >
        <Image source={{uri: item?.ImageUrl}} style={[styles.img, styleImg]} />
        <View style={styles.wrapText}>
          <Text fs="h6" fw="900" color={Colors.bs4}>
            {item?.Title?.toUpperCase()}
          </Text>
          <Text numberOfLines={2} fs="sm" color={Colors.bs4}>
            {item?.Content}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.name}-${Math.random(0, 100)}`}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={[styles.list, style]}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    // marginBottom: 20,
    marginRight: -Spacing.PADDING,
  },
  item: {},
  wrapText: {
    position: 'absolute',
    left: scale(18),
    top: 30,
    width: '65%',
  },
  img: {
    width: '100%',
    height: scale(112),
    borderRadius: 8,
  },
});

export default React.memo(Banner);
