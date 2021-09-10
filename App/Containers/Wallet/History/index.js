import React from 'react';
import {
  View,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import {Header, HeaderBg, Text} from 'components';
import Navigator from 'navigations/Navigator';
import {useTranslation} from 'context/Language';
import {SCREEN} from 'configs/Constants';
import {Images, Colors, Spacing} from 'themes';
const History = () => {
  const translation = useTranslation();
  return (
    <>
      <View>
        <HeaderBg style={[styles.bgWhite]}>
          <Header title={translation?.transaction_history} />
        </HeaderBg>
        {/* <Header back title="Lịch sử" avoidStatusBar blackIcon /> */}
        {/* <Pressable onPress={() => Navigator.navigate(SCREEN.DETAIL_HISTORY)}>
          <Text>Chi tiết</Text>
        </Pressable> */}
        <View>
          <TextInput
            placeholder={translation.search_a_transaction}
            // onChange={handleChange('phone')}
            // onBlur={handleBlur('phone')}
            // error={touched.phone && errors.phone}
            // value={values.phone}
            leftIcon={Images.Search}
            // isDeleted={values.phone}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // wrap: {
  //   paddingHorizontal: Spacing.PADDING,
  // },
  bgWhite: {backgroundColor: Colors.white},
});
export default History;
