import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {Row, Col} from 'components';
import {Spacing} from 'themes';
import {View} from 'react-native-ui-lib';
import {scale} from 'utils/Functions';

import ImgText from 'components/Common/Card/ImgText';

const ListItem = ({
  data,
  scroll,
  col,
  space,
  width,
  styleItem,
  styleWicon,
  styleIcon,
  styleText,
}) => {
  const _screenWidth = Math.min(
    Dimensions.get('window').width,
    //Dimensions.get('window').height,
  );
  const screenContent = _screenWidth - (Spacing.PADDING * 2 + 15);
  // const Item = ({item}) => (
  //   <TouchableOpacity
  //     onPress={() => { Navigator.push(item.screen);  }}>
  //     <Text centered size={12} mt={5}> {item.name} </Text>
  //   </TouchableOpacity>
  // );

  const renderItem = ({item, index}) => (
    <View
      style={[
        col > 1 && {width: scale((screenContent - (col - 1) * space) / col)},
        width && {width: scale(width)},
        space && {marginBottom: scale(space)},
        index && {marginLeft: scale(space)},
      ]}>
      <ImgText
        item={item}
        styleItem={styleItem}
        styleWicon={styleWicon}
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
          //showsHorizontalScrollIndicator={true}
          horizontal={true}
        />
      ) : (
        <Row space={space}>
          {data.map((item, index) => {
            return (
              <Col
                width={`${100 / col}%`}
                space={space}
                key={index}
                style={[space && {marginBottom: space}]}>
                <ImgText
                  item={item}
                  styleItem={styleItem}
                  styleWicon={styleWicon}
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

export default ListItem;
