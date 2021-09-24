import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HeaderBg, Header, Icon, Text, InputBlock, Row, Col} from 'components';
import {useTranslation} from 'context/Language';
import {Colors, Spacing} from 'themes';

export default function () {
  const translation = useTranslation();
  const renderBankInfo = () => {};
  const renderCard = () => {};
  return (
    <View flex={1} backgroundColor={Colors.WHITETEXT}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
      </HeaderBg>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {renderBankInfo()}
        {renderCard()}
        <Text> heee</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  pt_1: {paddingTop: 24},
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  flex_2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  items_center: {
    alignItems: 'center',
  },
  btn: {
    minWidth: 102,
    borderRadius: 16,
    height: 32,
  },
  input: {
    borderColor: 'black',
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  mb_1: {marginBottom: 16},
  dot: {
    width: 3,
    height: 3,
    marginRight: 8,
    backgroundColor: '#666666',
    borderRadius: 100,
  },
  text_gray: {color: '#666666'},
});
