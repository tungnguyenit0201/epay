import React from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Pressable,
} from 'react-native';
import Row from '../Atoms/Row';
import Col from '../Atoms/Col';
import Text from '../Atoms/Text';
import {Spacing} from 'themes';
import {scale} from 'utils/Functions';

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
  const _screenWidth = Math.min(375);
  const screenContent = _screenWidth - (Spacing.PADDING * 2 + 15);
  const Item = ({item}) => (
    <Pressable
      style={[styles.item, styleItem]}
      onPress={() => {
        console.log('hello');
      }}>
      <Image
        source={item.icon.default}
        style={[
          {width: scale(sizeIcon), height: scale(sizeIcon)},
          styles.icon,
          styleIcon,
        ]}
      />

      <Text centered bold mt={5} style={styleText}>
        {item.name}
      </Text>
    </Pressable>
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
          keyExtractor={(item, index) => item.name}
          showsHorizontalScrollIndicator={false}
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
    // opacity: -1,
  },
});

export default ListItem;
