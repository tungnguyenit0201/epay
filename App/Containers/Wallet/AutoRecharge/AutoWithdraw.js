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
          label={translation.continue}
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
        <View style={[styles.boxShadowGray, styles.pxy1, styles.mb1]}>
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

        <View style={styles.mb5}>
          <TouchableOpacity
            style={[
              styles.boxShadowGray,
              styles.mb5,
              {backgroundColor: Colors.bg1},
            ]}
          >
            <View style={[styles.flexRow, styles.pxy2]}>
              <Image
                source={Images.ConnectBank.logoAgribank}
                style={[
                  {
                    width: scale(34),
                    aspectRatio: 1,
                  },
                  styles.mr1,
                ]}
                resizeMode={'contain'}
              />
              <View flex={1} style={styles.flexRow} flexWrap="wrap">
                <View style={[styles.widthHaft, styles.pr2]}>
                  <Text bold fs="h6" mb={6}>
                    Vietcombank
                  </Text>
                </View>

                <View style={styles.widthHaft}>
                  <Image
                    resizeMode="cover"
                    source={Images.Check}
                    style={styles.iconCheck1}
                  />
                </View>

                <View style={[styles.widthPercent1, styles.pr2]}>
                  <Text size={Fonts.SM} color={Colors.tp3}>
                    **********1234
                  </Text>
                </View>

                <View style={styles.widthPercent2}>
                  <Text size={Fonts.MD} right color={Colors.tp3}>
                    Phí giao dịch: X.000đ
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.boxBlue1,
                {
                  backgroundColor: Colors.brd2,
                },
              ]}
            >
              <Text size={Fonts.SX}>Hạn mức nạp tự động: 2.000.000đ</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.boxShadowGray,
              styles.mb5,
              {backgroundColor: Colors.bg1},
            ]}
          >
            <View style={[styles.flexRow, styles.pxy2]}>
              <Image
                source={Images.ConnectBank.logoAgribank}
                style={[
                  {
                    width: scale(34),
                    aspectRatio: 1,
                  },
                  styles.mr1,
                ]}
                resizeMode={'contain'}
              />
              <View flex={1} style={styles.flexRow} flexWrap="wrap">
                <View style={[styles.widthHaft, styles.pr2]}>
                  <Text bold fs="h6" mb={6}>
                    Vietcombank
                  </Text>
                </View>

                <View style={styles.widthHaft}>
                  <View style={[base.leftAuto, styles.iconUnActive1]} />
                </View>

                <View style={[styles.widthPercent1, styles.pr2]}>
                  <Text size={Fonts.SM} color={Colors.tp3}>
                    **********1234
                  </Text>
                </View>

                <View style={styles.widthPercent2}>
                  <Text size={Fonts.MD} right color={Colors.tp3}>
                    Phí giao dịch: X.000đ
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.boxBlue1,
                {
                  backgroundColor: Colors.bs2,
                },
              ]}
            >
              <Text size={Fonts.SX}>Hạn mức nạp tự động: 2.000.000đ</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text bold size={Fonts.LG} mb={16}>
          {translation.add_bank}
        </Text>

        <TouchableOpacity style={[base.row, styles.btnAddBank]}>
          <View style={styles.flex1}>
            <Text fs="h6">{translation.add_bank}</Text>
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
  //---------------
  widthHaft: {width: '50%'},
  //-----------------
  widthPercent1: {width: '40%'},
  widthPercent2: {width: '60%'},
  //-----------------
  mr1: {marginRight: 10},
  //-----------------
  mb1: {marginBottom: 24},
  mb2: {marginBottom: 32},
  mb3: {marginBottom: 2},
  mb4: {marginBottom: 8},
  mb5: {marginBottom: 16},
  //-----------------
  ml1: {marginLeft: 3},
  //-----------------
  pxy1: {
    paddingHorizontal: 12,
    paddingTop: 30,
    paddingBottom: 32,
  },
  pxy2: {
    paddingVertical: 11,
    paddingHorizontal: 13,
  },
  //-----------------
  px1: {paddingHorizontal: Spacing.PADDING},
  //-----------------
  py1: {paddingVertical: Spacing.PADDING},
  //-----------------
  pr1: {paddingRight: 40},
  pr2: {paddingRight: 8},
  //----------------
  iconPlus: {
    width: scale(24),
    height: scale(24),
  },
  //----------------
  iconCheck1: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
    borderRadius: 16,
  },
  //----------------
  iconUnActive1: {
    width: 20,
    height: 20,
    borderRadius: 16,
    backgroundColor: Colors.bs4,
    borderWidth: 1,
    borderColor: Colors.tp3,
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
  //----------------
  boxBlue1: {
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
