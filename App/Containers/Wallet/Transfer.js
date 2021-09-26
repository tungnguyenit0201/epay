import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Button, HeaderBg, TextInput, Icon, Header} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import Modal from 'react-native-modal';
import {useTranslation} from 'context/Language';
import useContacts from 'context/Wallet/utils/contacts';

const Transfer = () => {
  const [open, setOpen] = useState(false);
  const translation = useTranslation();

  return (
    <ScrollView
      style={styles.container}
      stickyHeaderIndices={[0]}
      bounces={false}>
      <HeaderBg>
        <Header back title={translation.transfer} />
      </HeaderBg>
      <View style={styles.mt_30}>
        <View style={styles.flexBox}>
          <View style={styles.wrap}>
            {/* Input with Icon */}
            <View style={styles.inputIcon}>
              <TouchableOpacity style={styles.iconSearch}>
                <Icon icon={Images.Search} tintColor={Colors.g4} />
              </TouchableOpacity>
              <TextInput
                style={styles.inputSearch}
                placeholder={translation.enter_name_or_phone_number}
                placeholderTextColor={Colors.g4}
              />
            </View>
            {/* Input with Icon */}
            {/* Icon Rectangle */}
            <Icon
              style={styles.iconRectangle}
              icon={Images.Transfer.Rectangle}
              tintColor={Colors.g2}
            />
            {/* Icon Rectangle */}
            {/* Text with Icon */}
            <TouchableOpacity
              onPress={() => {
                Navigator.navigate(SCREEN.CONTACTS);
              }}
              style={styles.inputNavigate}>
              <Icon
                style={styles.iconNav}
                icon={Images.Transfer.Mobile}
                tintColor={Colors.cl1}
              />
              <Text style={styles.arrowIcon}>
                {translation.transfer_via_a_phone_number}
              </Text>
              <View style={styles.iconLocation}>
                <Icon
                  icon={Images.Transfer.ArrowRight}
                  tintColor={Colors.black}
                  style={styles.arrowRight}
                />
              </View>
            </TouchableOpacity>
            {/* Text with Icon */}

            {/* Text with Icon */}
            <TouchableOpacity
              onPress={() => {
                Navigator.navigate(SCREEN.BANK_LIST);
              }}
              style={styles.inputNavigate}>
              <Icon
                style={styles.iconNav}
                icon={Images.Transfer.Bank}
                tintColor={Colors.cl1}
              />
              <Text style={styles.arrowIcon}>
                {translation.transfer_via_a_bank}
              </Text>
              <View style={styles.iconLocation}>
                <Icon
                  icon={Images.Transfer.ArrowRight}
                  tintColor={Colors.black}
                  style={styles.arrowRight}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*<Modal*/}
      {/*  isVisible={open}*/}
      {/*  animationIn="fadeIn"*/}
      {/*  animationOut="fadeOut"*/}
      {/*  style={{flex: 1}}*/}
      {/*  useNativeDriver*/}
      {/*  hideModalContentWhileAnimating*/}
      {/*  backdropTransitionOutTiming={0}>*/}
      {/*  <View style={styles.modal}>*/}
      {/*    <Text bold style={styles.textTitle}>*/}
      {/*      {translation.allow_access_to_contact_book}*/}
      {/*    </Text>*/}
      {/*    <Text style={styles.textDescription}>*/}
      {/*      {*/}
      {/*        translation.to_use_the_money_transfer_function_epay_needs_access_to_your_contact_book*/}
      {/*      }*/}
      {/*    </Text>*/}
      {/*    <View style={styles.blockButton}>*/}
      {/*      <Button*/}
      {/*        label="Không"*/}
      {/*        style={styles.buttonCancle}*/}
      {/*        color={Colors.cl1}*/}
      {/*        fs={Fonts.H6}*/}
      {/*        onPress={() => setOpen(false)}*/}
      {/*      />*/}
      {/*      <Button*/}
      {/*        label="Đồng ý"*/}
      {/*        style={styles.buttonAcp}*/}
      {/*        fs={Fonts.H6}*/}
      {/*        onPress={() =>*/}
      {/*          setOpen(false) & Navigator.navigate(SCREEN.CONTACTS)*/}
      {/*        }*/}
      {/*      />*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</Modal>*/}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: Fonts.H6,
    textAlign: 'center',
  },
  inputIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.g2,
    borderWidth: 1,
    borderRadius: scale(5),
  },
  iconNav: {
    width: scale(18),
    height: scale(22),
    position: 'relative',
    top: scale(2),
    marginRight: scale(20),
  },
  iconSearch: {
    paddingHorizontal: scale(10),
    borderRightWidth: 1,
    borderColor: Colors.g2,
  },
  inputSearch: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: Fonts.H6,
    borderColor: 'transparent',
  },
  iconRectangle: {
    height: scale(8),
    width: '100%',
    marginVertical: scale(24),
  },
  textTitle: {
    fontSize: Fonts.H6,
    textAlign: 'center',
  },
  textDescription: {
    fontSize: Fonts.FONT_MEDIUM,
    marginTop: scale(8),
    textAlign: 'center',
  },
  buttonCancle: {
    width: scale(120),
    height: scale(42),
    backgroundColor: 'transparent',
    borderColor: Colors.cl1,
    borderWidth: 1,
  },
  blockButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(16),
  },
  buttonAcp: {
    width: scale(120),
    height: scale(42),
  },
  mt_30: {
    marginBottom: scale(30),
  },
  flexBox: {
    flex: 3,
  },
  iconLocation: {
    position: 'absolute',
    right: scale(15),
    top: scale(15),
  },
  icon: {
    width: scale(20),
    height: scale(20),
  },
  inputNavigate: {
    backgroundColor: '#DAE9F8',
    padding: Spacing.PADDING,
    marginBottom: scale(10),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    color: Colors.black,
    fontSize: Fonts.H6,
  },
  modal: {
    height: scale(180),
    backgroundColor: Colors.white,
    paddingVertical: Spacing.PADDING,
    paddingHorizontal: Spacing.PADDING + scale(20),
    borderRadius: scale(5),
  },
  arrowRight: {
    position: 'relative',
    top: scale(4),
  },
});
export default Transfer;
