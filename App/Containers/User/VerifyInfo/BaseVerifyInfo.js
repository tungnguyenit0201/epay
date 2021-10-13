import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {Text, Header, Button, HeaderBg} from 'components';
import {Images, Colors, Spacing} from 'themes';
import Progress from 'components/User/VerifyInfo/Progress';
import {useTranslation} from 'context/Language';
import Modal from 'react-native-modal';
import Row from 'components/Common/Row';
import Col from 'components/Common/Col';
import {scale} from 'utils/Functions';

import {FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const VerifyUserInfo = ({
  children,
  disableButton,
  onPressButton,
  step,
  buttonTitle,
  showButton = true,
  showInstruction = true,
}) => {
  const translation = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const ruleTexts = [
    'Hình chụp phải đủ sáng, không bị mờ, chói sáng.',
    'Chứng từ phải nguyên vẹn, không mất góc.',
    'Chứng từ là bản gốc, còn hạn sử dụng.',
  ];
  const listFailedIndetityCard = [
    {img: Images.VerifyUserInfo.cmndBlur, title: 'Chụp bị mờ'},
    {img: Images.VerifyUserInfo.cmndDark, title: 'Dư, thiếu sáng'},
    {img: Images.VerifyUserInfo.cmndFail, title: 'Chụp mất góc'},
  ];

  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  /**
   * RENDER CHILD VIEWS
   */
  const renderChildren = () =>
    React.Children.map(React.Children.toArray(children), child =>
      React.cloneElement(child),
    );

  return (
    <>
      <HeaderBg style={styles.header}>
        <Header
          back
          title={translation?.account_verification}
          renderRightComponent={() => {
            if (showInstruction) {
              return (
                <TouchableOpacity onPress={onShowModal}>
                  <Text fs="md" color={Colors.white} style={styles.help}>
                    Hướng dẫn
                  </Text>
                </TouchableOpacity>
              );
            }
            return <View />;
          }}
        />
        <Progress step={step} />

        <Image
          source={Images.VerifyUserInfo.iconDown}
          style={styles.triangle}
          resizeMode="contain"
        />
      </HeaderBg>

      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        {renderChildren()}
      </ScrollView>
      {!!showButton && (
        <View style={styles.bottom}>
          <View style={styles.modalBottomButton}>
            <Button
              disabled={disableButton}
              label={buttonTitle}
              onPress={onPressButton}
            />
          </View>
        </View>
      )}
      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modalContainer}
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onBackdropPress={onHideModal}
      >
        <View style={styles.modalContentContainer}>
          <ScrollView style={styles.modalScroll}>
            <View style={styles.modalTitleContainer}>
              <Text
                bold
                fs="h4"
                centered
                color={Colors.cl1}
                style={styles.modalTitle}
              >
                Hướng dẫn chụp hình 2 mặt chứng từ
              </Text>
            </View>

            <Text bold fs="h6" mb={16}>
              GTTT phải đảm bảo các yêu cầu dưới đây:
            </Text>

            {ruleTexts.map((e, index) => (
              <View key={index} style={styles.rulesContainer}>
                <Image
                  source={Images.VerifyUserInfo.tick}
                  style={styles.tickIcon}
                />
                <Text bold fs="h6" color={Colors.gray} style={styles.flex}>
                  {e}
                </Text>
              </View>
            ))}
            <Text bold fs="h6" mb={24}>
              Những trường hợp chụp GTTT sai:
            </Text>

            <Row space={16}>
              {listFailedIndetityCard.map((e, index) => (
                <Col width="33.3333%" space={16} key={index} style={styles.mb2}>
                  <View style={styles.ptb1}>
                    <Image
                      source={e.img}
                      style={styles.failIcon}
                      resizeMode="contain"
                    />

                    <Image
                      source={Images.VerifyUserInfo.topLeftAngle}
                      style={styles.failItem}
                      resizeMode="contain"
                    />
                    <Image
                      source={Images.VerifyUserInfo.topRightAngle}
                      style={styles.failItem}
                      resizeMode="contain"
                    />
                    <Image
                      source={Images.VerifyUserInfo.botLeftAngle}
                      style={styles.failItem}
                      resizeMode="contain"
                    />
                    <Image
                      source={Images.VerifyUserInfo.botRightAngle}
                      style={styles.failItem}
                      resizeMode="contain"
                    />
                  </View>
                  <Text bold fs="md" centered mt={8}>
                    {e.title}
                  </Text>
                </Col>
              ))}
            </Row>
          </ScrollView>
          <View style={styles.modalBottomButton}>
            <Button label="Đã hiểu" bold onPress={onHideModal} />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.white,
    position: 'relative',
    paddingBottom: 0,
    marginBottom: 0,
    zIndex: 1,
  },
  triangle: {
    position: 'absolute',
    // left: Spacing.PADDING * 2 + 10 / 2,
    left: Spacing.PADDING * 2 + 30 / 2,
    bottom: -9,
    width: 20,
    height: 10,
  },
  buton: {
    paddingHorizontal: Spacing.PADDING,
    backgroundColor: Colors.white,
    paddingVertical: Spacing.PADDING,
  },
  modalContainer: {
    width: '100%',
    marginLeft: 0,
    marginBottom: 0,
  },
  modalContentContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    position: 'absolute',
    width: '100%',
    padding: 0,
    bottom: 0,
  },
  modalScroll: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: 37,
  },
  modalTitleContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  modalTitle: {
    maxWidth: 270,
    height: 65,
  },
  rulesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tickIcon: {
    marginRight: 9,
    width: scale(13),
    height: scale(13),
  },
  flex: {
    flex: 1,
  },
  mb2: {
    marginBottom: 16,
  },
  pt1: {
    paddingTop: 48,
  },
  failIcon: {
    height: 65,
    width: '100%',
  },
  failItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
  },
  modalBottomButton: {
    paddingHorizontal: Spacing.PADDING,
    // paddingVertical: Spacing.PADDING,
    paddingTop: Spacing.PADDING,
    paddingBottom: Spacing.PADDING * 2,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
  bottom: {
    backgroundColor: Colors.white,
  },
  help: {
    position: 'relative',
    bottom: scale(2),
  },
});

export default VerifyUserInfo;
