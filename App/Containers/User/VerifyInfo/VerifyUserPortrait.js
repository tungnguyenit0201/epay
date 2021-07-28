import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN, TEXT} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import SelectImage from 'components/User/VerifyInfo/SelectImage';

const VerifyUserPortrait = ({route}) => {
  const {data, onChange} = useVerifyInfo(route?.params);

  const onPress = () => {
    console.log('data', data);
    alert(data);
  };

  return (
    <View style={styles.container}>
      <Header back title={TEXT.VERIFY_ACCOUNT} />
      <ScrollView>
        <Progress />
        <SelectImage
          title="Hình minh họa"
          onSelectImage={value => onChange('portrait', value)}
        />
      </ScrollView>
      <Button label={TEXT.DONE} onPress={onPress} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
});
export default VerifyUserPortrait;
