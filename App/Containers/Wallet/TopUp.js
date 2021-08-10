import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {
  Text,
  TextInput,
  Header,
  InputBlock,
  Button,
  Row,
  Col,
} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Monney from 'components/Home/Monney';

import InputMoney from 'components/User/InputMoney';
import SelectBank from 'components/User/TopUp/SelectBank';

import ListItem from 'components/Common/ListItem';
import HeaderBg from 'components/Common/HeaderBg';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';

const TopUp = () => {
  const translation = useTranslation();
  const dataBank = [
    {
      id: 1,
      icon: Images.Bank.Vietinbank,
      name: 'Vietinbank',
      screen: SCREEN.TOP_UP,
    },
    {
      id: 2,
      icon: Images.Bank.Eximbank,
      name: 'Eximbank',
      screen: SCREEN.TOP_UP,
    },
    {
      id: 3,
      icon: Images.Bank.Vietcombank,
      name: 'Vietcombank',
      screen: SCREEN.TOP_UP,
    },
  ];

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg style={{marginBottom: 50}}>
        <Header title={translation.top_up} back style={{marginBottom: 20}} />
        <Monney
          style={[
            {
              position: 'absolute',
              bottom: -20,
              left: Spacing.PADDING,
              right: Spacing.PADDING,
            },
          ]}
        />
      </HeaderBg>
      <View style={base.container}>
        <InputMoney />
        <SelectBank data={dataBank} label={translation.source} />

        <Button
          label="Nạp"
          onPress={() => Navigator.navigate(SCREEN.CONFIRMATION)}
        />
      </View>
    </ScrollView>
  );
};

export default TopUp;
