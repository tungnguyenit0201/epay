import React from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import {Text, Row, Col} from 'components';
import {Colors, Spacing} from 'themes';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {name: 'Chụp ảnh GTTT'},
  {name: 'Chụp ảnh chân dung'},
  {name: 'Thông tin cá nhân'},
];

const Progress = ({step}) => {
  const {width} = useWindowDimensions();
  const widthBar = width - Spacing.PADDING * 2;
  const sum = n => (!(n > 1) ? 1 : sum(n - 1) + 2);

  const stepColor = sum(step);
  let num = step == 1 ? -Spacing.PADDING : step == 3 ? Spacing.PADDING : 0;
  return (
    <>
      <View style={[styles.bar, styles.barWhite]}>
        <LinearGradient
          start={{x: 0, y: 0.75}}
          end={{x: 1, y: 0.25}}
          colors={[Colors.barLeft, Colors.barRight]}
          style={[
            styles.bar,
            {width: (widthBar / 6) * stepColor + num},
          ]}></LinearGradient>
      </View>

      <Row justify="space-between" space={1} style={{marginBottom: 20}}>
        {data.map((item, index) => {
          return (
            <Col width={`${100 / 3}%`} space={1} key={index}>
              <View
                style={[
                  {alignItems: 'center'},
                  index == 0 && {marginLeft: -Spacing.PADDING * 2},
                  index == 2 && {paddingLeft: Spacing.PADDING * 2},
                ]}>
                <View style={[styles.circle]}>
                  <View
                    style={[
                      styles.circleInner,
                      index + 1 <= step && styles.circleInnerActive,
                    ]}></View>
                </View>
                <Text style={[styles.text]}>{item.name}</Text>
              </View>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
const styles = StyleSheet.create({
  bar: {
    height: 2,
    borderRadius: 2,
  },
  barWhite: {
    backgroundColor: Colors.white,
    width: '100%',
    marginTop: 10,
    marginBottom: -10,
  },
  circle: {
    width: 20,
    height: 20,
    marginBottom: 10,
  },
  circleInner: {
    backgroundColor: Colors.white,
    width: 12,
    height: 12,
    borderRadius: 99,
    marginLeft: 3,
    marginTop: 3,
  },
  circleInnerActive: {
    backgroundColor: Colors.barRight,
  },
  text: {
    width: 80,
    color: Colors.white,
    textAlign: 'center',
  },
});
export default Progress;
