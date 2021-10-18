import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HeaderBg, Header, Icon, InputBlock, Row, Col} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';

const ListBank = ({listBank, space}) => {
  const translation = useTranslation();

  const Item = ({title, icon, screen, iconHeight, iconWidth}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        Navigator.navigate(screen);
      }}
    >
      <View style={styles.block1}>
        <Image
          source={icon}
          style={{
            width: iconWidth ? iconWidth : scale(26),
            height: iconHeight ? scale(iconHeight) : scale(26),
          }}
        />
      </View>
      <Text centered style={styles.mt1}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Row space={space ? space : 5}>
      {!!listBank &&
        listBank.map((item, index) => {
          return (
            <Col
              width={`33.333%`}
              space={space ? space : 5}
              key={index}
              style={styles.mb1}
            >
              <Item
                title={item.name}
                icon={item.icon}
                screen={item.screen}
                iconHeight={item.iconHeight}
                iconWidth={item.iconWidth}
              />
            </Col>
          );
        })}
    </Row>
  );
};

const styles = StyleSheet.create({
  mt1: {marginTop: 10},
  //--------------
  mb1: {marginBottom: 15},
  //--------------
  item: {alignItems: 'center'},
  block1: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: Colors.bs2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListBank;
