import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import Button from '../../../Atoms/Button';
import HeaderBg from '../../../Atoms/HeaderBg';
import {base, Images, Colors, Spacing, Fonts} from 'themes';
import Progress from '../../../Groups/Progress';
import SelectImage from '../../../Groups/SelectImage';
import Modal from '../../../Groups/ModalBottom';
import _ from 'lodash';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FooterContainer from '../../../Atoms/FooterContainer';
import Wrapper from '../../../Groups/Wrapper';

const VerifyUserInfo = ({}) => {
  const translation = require('../../../../Context/Language/vi.json');
  const identityCard = 1;
  const [showModal, setShowModal] = React.useState(false);
  const CMND = [
    {title: 'Ảnh mặt trước', img: require('images/storybook/before.png')},
    {title: 'Ảnh mặt sau', img: require('images/storybook/after.png')},
  ];
  return (
    //TODO: translate
    <Wrapper>
      <SafeAreaProvider>
        <HeaderBg style={[styles.bgWhite, styles.headerContainer]}>
          <Header back title={translation?.account_verification} />
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.guildBtn}>
            <Text fs="md" color={Colors.white}>
              Hướng dẫn
            </Text>
          </TouchableOpacity>
          <Image
            source={Images.Storybook.Progress.default}
            style={{height: 60, marginTop: 25, marginBottom: 15}}
          />
          <Image
            source={Images.VerifyUserInfo.iconDown.default}
            style={[styles.triangleDown, styles.triangleDownImg]}
            resizeMode="contain"
          />
        </HeaderBg>
        <View style={[styles.pt1]}>
          {/* <Image
          source={require('images/storybook/before.png').default}
          style={{width: 342, height: 260}}
        /> */}
          {CMND.map((cmnd, index) => (
            <View
              style={[
                base.boxShadow,
                {
                  width: 342,
                  height: 260,
                  marginHorizontal: 'auto',
                  marginVertical: 0,
                  marginBottom: 25,
                },
              ]}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text bold style={{textTransform: 'uppercase'}}>
                  {cmnd.title}
                </Text>
                <Image
                  source={Images.Gradient.B_photo.default}
                  style={{
                    height: 35,
                    width: 120,
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                />
              </View>
              <Image
                source={cmnd.img.default}
                style={{
                  width: 280,
                  height: 187,
                  marginHorizontal: 'auto',
                  marginVertical: 0,
                }}
              />
            </View>
          ))}
        </View>
        <Modal visible={showModal} onClose={() => setShowModal(false)}>
          <Image
            source={require('images/storybook/help.png').default}
            style={{width: 344, height: 395}}
          />
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Image
              source={Images.Gradient.B_Understood.default}
              style={{
                height: 48,
                borderRadius: 8,
                cursor: 'pointer',
                marginTop: 16,
                backgroundColor: 'red',
              }}
            />
          </TouchableOpacity>
        </Modal>
      </SafeAreaProvider>
      <FooterContainer>
        <Image
          source={Images.Gradient.B_continueDisable.default}
          style={base.buttonSB}
        />
      </FooterContainer>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  py1: {paddingVertical: Spacing.PADDING},
  pt1: {paddingTop: 48},
  mb1: {marginBottom: 32},
  bgWhite: {backgroundColor: Colors.white},
  headerContainer: {
    position: 'relative',
    paddingBottom: 0,
    marginBottom: 0,
    zIndex: 1,
  },
  guildBtn: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  triangleDown: {
    position: 'absolute',
    left: 30,
    bottom: -9,
  },
  triangleDownImg: {
    width: 20,
    height: 10,
  },
});

export default VerifyUserInfo;
