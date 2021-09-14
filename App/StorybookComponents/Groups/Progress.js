import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../Atoms/Text';
import Row from '../Atoms/Row';
import Col from '../Atoms/Col';
import {Colors} from 'themes';

const data = [
  {name: 'Chụp hình cmnd'},
  {name: 'Chụp ảnh chân dung'},
  {name: 'Thông tin cá nhân'},
];

const Progress = ({step}) => {
  return (
    <>
      <View style={styles.bar}></View>
      <Row justify="space-between" space={1} style={{marginBottom: 20}}>
        {data.map((item, index) => {
          return (
            <Col width={`${100 / data.lenght}%`} space={1} key={index}>
              <View
                style={[
                  index === 1 && {alignItems: 'center'},
                  index === 2 && {alignItems: 'flex-end'},
                ]}>
                <View
                  style={[
                    styles.circle,
                    index + 1 === step && styles.circleActive,
                  ]}>
                  <View
                    style={[
                      styles.circleInner,
                      index + 1 === step && styles.circleInnerActive,
                    ]}></View>
                </View>
                <Text
                  style={[
                    styles.text,
                    index === 1 && {textAlign: 'center'},
                    index === 2 && {textAlign: 'right'},
                  ]}>
                  {item.name}
                </Text>
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
    height: 4,
    backgroundColor: Colors.l5,
    marginTop: 10,
    marginBottom: -12,
    marginHorizontal: 10,
  },
  circle: {
    borderColor: 'transparent',
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 99,
    marginBottom: 10,
  },
  circleActive: {
    borderColor: Colors.cl1,
  },
  circleInner: {
    backgroundColor: Colors.l5,
    width: 12,
    height: 12,
    borderRadius: 99,
    marginLeft: 3,
    marginTop: 3,
  },
  circleInnerActive: {
    backgroundColor: Colors.cl1,
  },
  text: {
    width: 80,
  },
});
export default Progress;
