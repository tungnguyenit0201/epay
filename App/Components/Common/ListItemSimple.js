import React from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Row, Col, Text, Modal, Button} from 'components';
import {Spacing} from 'themes';
import {View} from 'react-native-ui-lib';
import {scale} from 'utils/Functions';
import Navigator from 'navigations/Navigator';
import {useCheckInfo} from 'context/Home/utils';
import {useTranslation} from 'context/Language';

const ListItem = ({
  data,
  scroll,
  col,
  space,
  width,
  style,
  sizeIcon = 32,
  styleItem,
  styleIcon,
  styleText,
}) => {
  const _screenWidth = Math.min(Dimensions.get('window').width);
  const screenContent = _screenWidth - (Spacing.PADDING * 2 + 15);
  const {checkInfo} = useCheckInfo();
  const translation = useTranslation();

  const Item = ({item}) => (
    <TouchableOpacity
      style={[styles.item, styleItem]}
      onPress={() => {
        // !!item?.checkSmartOTP
        //   ? checkInfo({screen: item.screen})
        //   : Navigator.navigate(item.screen);
        if (item.checkPermission) {
          item.checkPermission().then(() => {
            Navigator.navigate(item.screen);
          });
        } else {
          Navigator.navigate(item.screen);
        }
      }}>
      <Image
        source={item.icon}
        style={[
          {width: scale(sizeIcon), height: scale(sizeIcon)},
          styles.icon,
          styleIcon,
        ]}
      />

      <Text centered bold mt={5} style={styleText}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({item, index}) => (
    <View
      style={[
        col > 1 && {width: scale((screenContent - (col - 1) * space) / col)},
        width && {width: scale(width)},
        space && {marginBottom: scale(space)},
        index && {marginLeft: scale(space)},
      ]}>
      <Item
        item={item}
        styleItem={styleItem}
        styleIcon={styleIcon}
        styleText={styleText}
      />
    </View>
  );

  return (
    <>
      {scroll && data.length > col ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${Math.random(1, 100)}-simple`}
          //showsHorizontalScrollIndicator={true}
          horizontal={true}
          style={style}
        />
      ) : (
        <Row space={space} style={style}>
          {data.map((item, index) => {
            return (
              <Col
                width={`${100 / col}%`}
                space={space}
                key={index}
                style={[space && {marginBottom: space}]}>
                <Item
                  item={item}
                  styleItem={styleItem}
                  styleIcon={styleIcon}
                  styleText={styleText}
                />
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
  },
  icon: {
    resizeMode: 'contain',
    marginBottom: 5,
  },
});

export default ListItem;
