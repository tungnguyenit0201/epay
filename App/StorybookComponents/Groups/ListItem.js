import React from 'react';
import {FlatList, Dimensions, View} from 'react-native';
import Row from '../Atoms/Row';
import Col from '../Atoms/Col';
import {Spacing} from 'themes';
import {scale} from 'utils/Functions';

import ImgText from '../Atoms/ImgText';

const ListItem = ({
  data,
  scroll,
  col,
  space,
  width,
  style,
  styleItem,
  styleWicon,
  styleIcon,
  styleText,
}) => {
  const _screenWidth = Math.min(
    375,
    812,
  );
  const screenContent = _screenWidth - (Spacing.PADDING * 2 + 15);
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
