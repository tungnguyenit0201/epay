import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  HeaderBg,
  Header,
  Button,
  InputBlock,
  Checkbox,
  TextInput,
  Text,
  FooterContainer,
} from 'components';
import {Colors, Spacing, Images, Fonts, base} from 'themes';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';

const AutoWithdraw = props => {
  const translation = useTranslation();

  const renderButton = () => {
    return (
      <FooterContainer>
        <Button
          // label={translation.continue}
          label="Hủy liên kết"
          // size="lg"
          style={styles.button}
          // onPress={onSubmit}
        />
      </FooterContainer>
    );
  };

  return (
    //TODO: TRANSLATE
    <View flex={1} backgroundColor={Colors.bs4}>
      <HeaderBg>
        <Header back title={'Nạp ví tự động'} />
      </HeaderBg>

      <ScrollView
        contentContainerStyle={[styles.px1, styles.py1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.boxShadowGray, styles.pxy1]}>
          <Text size={Fonts.LG} bold mb={16}>
            {translation.enter_auto_topup_amount}
          </Text>

          <View style={styles.mb3}>
            <InputBlock
              placeholder={translation.enter_auto_topup_amount}
              // value={bankAccount}
              // onChangeText={onChangeBankNumber}
              // keyboardType={'numeric'}
              // error={err}
              showErrorLabel={true}
              // onBlur={validateInfo}
              // onFocus={onFocus}
              // onSubmitEditing={validateInfo}
              inputStyle={styles.pr1}
            />
            <Text bold size={Fonts.LG} style={styles.pos1}>
              đ
            </Text>
          </View>

          <Text fs="md" mb={8}>
            Tiền sẽ tự động nạp vào ví của bạn khi số dư trong ví EPAY ở mức tối
            thiểu là:
          </Text>

          <View style={styles.mb4}>
            <InputBlock
              placeholder={translation.enter_auto_topup_amount}
              showErrorLabel={true}
              inputStyle={styles.pr1}
            />
            <Text bold size={Fonts.LG} style={styles.pos1}>
              đ
            </Text>
          </View>

          <View style={styles.flexRow}>
            <Checkbox
            // onPress={setActive}
            />
            <Text ml={6} size={Fonts.MD}>
              {`Tôi đồng ý với `}
              <Text
                // onPress={() => onGoTerm(SCREEN.POLICY)}
                color={Colors.tp1}
                ml={3}
                size={Fonts.MD}
              >
                {'điều kiện chính sách '}
              </Text>
              của EPAY
            </Text>
          </View>
        </View>

        <Text bold size={Fonts.LG} mb={16}>
          {translation.source}
        </Text>

        <TouchableOpacity
          style={[styles.boxShadowGray, {backgroundColor: Colors.bg1}]}
        >
          <View
            style={[
              styles.flexRow,
              {
                padding: 10,
              },
            ]}
          >
            <View flex={1}>
              <Text style={styles.subTitle}>asdasd</Text>
            </View>
            <Image
              resizeMode="cover"
              source={Images.Check}
              style={{
                width: 20,
                height: 20,
                borderRadius: 16,
              }}
            />
            {/* <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 16,
                  backgroundColor: Colors.bs4,
                  borderWidth: 1,
                  borderColor: Colors.tp3,
                }}
              /> */}
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: Colors.grd1,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}
          >
            <Text>asdasd</Text>
          </View>
        </TouchableOpacity>

        <Text bold size={Fonts.LG} mb={16}>
          Thêm ngân hàng nhận tiền
        </Text>

        <TouchableOpacity style={[base.row, styles.btnAddBank]}>
          <View style={styles.flex1}>
            <Text fs="h6">{translation.add_bank_account}</Text>
          </View>
          <Image
            source={Images.ConnectBank.Plus}
            style={styles.iconPlus}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ScrollView>

      {renderButton()}
    </View>
  );
};
export default AutoWithdraw;

const styles = StyleSheet.create({
  flexRow: {flexDirection: 'row'},
  //-----------------
  flex1: {flex: 1},
  //-----------------
  mb1: {marginBottom: 16},
  mb2: {marginBottom: 32},
  mb3: {marginBottom: 2},
  mb4: {marginBottom: 8},
  //-----------------
  ml1: {marginLeft: 3},
  //-----------------
  pxy1: {
    paddingHorizontal: 12,
    paddingTop: 32,
    paddingBottom: 32,
  },
  //-----------------
  px1: {paddingHorizontal: Spacing.PADDING},
  //-----------------
  py1: {
    paddingTop: Spacing.PADDING,
    paddingBottom: 40,
  },
  //-----------------
  pr1: {paddingRight: 40},
  //-----------------
  image: {
    width: 20,
    height: 20,
  },
  icon: {
    position: 'absolute',
    top: 52,
    left: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.bs1,
    zIndex: 1,
  },
  input_text: {
    paddingLeft: 50,
    borderWidth: 0,
    borderRadius: 8,
  },
  item: {alignItems: 'center'},
  //----------------
  lineGray1: {
    height: 12,
    backgroundColor: Colors.bs2,
  },
  //----------------
  iconPlus: {
    width: scale(24),
    height: scale(24),
  },
  //----------------
  btnAddBank: {
    marginBottom: Spacing.PADDING,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.bs1,
    borderRadius: 8,
  },
  //----------------
  pos1: {
    position: 'absolute',
    right: 15,
    top: 11,
  },
  //----------------
  boxShadowGray: {
    backgroundColor: Colors.bs4,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
  },
});
