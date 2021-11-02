import React from 'react';
import {
  ScrollView,
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Text,
  Icon,
  Header,
  HeaderBg,
  ActionSheet,
  Modal,
} from 'components';
import {SCREEN, PERSONAL_IC, GENDER, FUNCTION_TYPE} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale, hideCMND, hidePhone} from 'utils/Functions';

import DinhDanh from 'components/User/DinhDanh';
import StatusUser from 'components/Common/StatusUser';

import {useUser} from 'context/User';
import {usePhone} from 'context/Auth/utils';
import {useTranslation} from 'context/Language';
import {useUserStatus, useUserInfo, useVerifyInfo} from 'context/User/utils';

const UserInfo = () => {
  const {top} = useSafeAreaInsets();
  const {phone} = usePhone();
  const {userInfo} = useUser();
  const translation = useTranslation();
  const {onUpdateAvatar, showModal, setShowModal} = useUserInfo();
  const {statusVerified, onVerify, getStatusVerifiedText} = useUserStatus();
  const {showModalReVerify, onReVerify} = useVerifyInfo();

  const PersonalInfo = userInfo.personalInfo;
  const AddressInfo = userInfo.personalAddress;
  const ICInfor = userInfo.personalIC;

  const address = [
    AddressInfo?.Address,
    AddressInfo?.Ward,
    AddressInfo?.County,
    AddressInfo?.Provincial,
  ]
    .filter(x => x)
    .join(', ');

  const data = [
    {
      icon: require('images/profile/User.png'),
      name: 'Họ tên',
      val: PersonalInfo?.FullName || <Text color={Colors.g4}>Chưa có</Text>,
    },
    {
      icon: require('images/profile/Date.png'),
      name: 'Ngày sinh',
      val: PersonalInfo?.DateOfBirth || <Text color={Colors.g4}>Chưa có</Text>,
    },
    {
      icon: require('images/profile/GioiTinh.png'),
      name: 'Giới tính',
      val: GENDER[PersonalInfo?.SexType] || (
        <Text color={Colors.g4}>Chưa có</Text>
      ),
    },
  ];

  return (
    //TODO: Translate
    <>
      <HeaderBg mb={0}>
        <Header back title={translation.profile} />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={[base.container]}>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Pressable style={{marginBottom: 15}} onPress={onUpdateAvatar}>
              <View style={styles.avatar}>
                <Image
                  style={{width: 120, height: 120}}
                  source={
                    PersonalInfo?.Avatar
                      ? {uri: PersonalInfo.Avatar}
                      : Images.User
                  }
                  resizeMode="cover"
                />
              </View>
              <View style={styles.wedit}>
                <Image style={styles.iconEdit} source={Images.Profile.Edit2} />
              </View>
            </Pressable>

            <Text fs="h5" bold mb={5}>
              {PersonalInfo?.FullName}
            </Text>
            <Text mb={10}>{hidePhone(phone)}</Text>

            <StatusUser />
          </View>

          {statusVerified === PERSONAL_IC.INACTIVE && <DinhDanh />}

          <View style={[base.boxShadow]}>
            <View style={styles.heading}>
              <View>
                <Text bold fs="h5" mb={5}>
                  {translation.perdonal_information}
                </Text>
                <Text style={styles.headingDesc}>
                  {translation.your_information}
                </Text>
              </View>

              {/* {statusVerified == PERSONAL_IC.ACTIVED && ( */}
              <TouchableOpacity
                style={base.leftAuto}
                disabled={
                  statusVerified === PERSONAL_IC.INACTIVE ? true : false
                }
                onPress={() => {
                  Navigator.navigate(SCREEN.EDIT_INFO);
                }}
              >
                <Image
                  style={
                    statusVerified === PERSONAL_IC.INACTIVE
                      ? styles.boxDisabled
                      : styles.editBox
                  }
                  source={require('images/profile/Edit2.png')}
                />
              </TouchableOpacity>
              {/* )} */}
            </View>
            {data.map((item, index) => {
              return (
                <View
                  style={[
                    styles.rowItem,
                    base.row,
                    index == 0 && styles.rowFirst,
                  ]}
                  key={index}
                >
                  <Image style={[styles.rowIcon]} source={item.icon} />
                  <Text style={styles.lh1} mr={3} fs="h6">
                    {item.name}
                  </Text>
                  <View style={styles.flex1}>
                    <Text fs="h6" style={[base.leftAuto, styles.lh1]} right>
                      {item.val}
                    </Text>
                  </View>
                </View>
              );
            })}
            <View style={[styles.rowItem]}>
              <Image
                style={[styles.rowIcon]}
                source={require('images/profile/CMND.png')}
              />
              <View>
                <Text mt={3} mb={5} fs="h6">
                  {translation.id_card + '/' + translation.passport}
                </Text>
                <Text>
                  {ICInfor?.ICNumber ? (
                    hideCMND(ICInfor?.ICNumber)
                  ) : (
                    <Text color={Colors.g4}>{translation.empty}</Text>
                  )}
                </Text>
              </View>
            </View>
            <View style={[styles.rowItem]}>
              <Image
                style={[styles.rowIcon]}
                source={require('images/profile/Location.png')}
              />
              <View style={styles.flex1}>
                <Text mt={3} mb={5} fs="h6">
                  Địa chỉ
                </Text>
                <Text>
                  {AddressInfo?.Provincial ? (
                    address
                  ) : (
                    <Text color={Colors.g4}>{translation.empty}</Text>
                  )}
                </Text>
              </View>
            </View>
          </View>

          <View style={[base.boxShadow]}>
            <View style={styles.heading}>
              <View>
                <Text bold fs="h5" mb={5}>
                  {translation.account_information}
                </Text>
                <Text style={styles.headingDesc}>
                  {translation.update_personal_id}
                </Text>
              </View>

              {![PERSONAL_IC.VERIFYING, PERSONAL_IC.RE_VERIFYING].includes(
                statusVerified,
              ) && (
                <TouchableOpacity
                  style={base.leftAuto}
                  onPress={
                    statusVerified == PERSONAL_IC.INACTIVE
                      ? onVerify
                      : () => onReVerify('showModal')
                  }
                >
                  <Image
                    style={[styles.editBox]}
                    source={require('images/profile/Edit2.png')}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={[base.row]}>
              <Image
                style={[styles.rowIcon]}
                source={
                  statusVerified == PERSONAL_IC.ACTIVED
                    ? Images.Profile.Validated
                    : statusVerified == PERSONAL_IC.EXPIRED
                    ? Images.Profile.Expired
                    : Images.Profile.Waiting
                }
              />
              <View>
                <Text fs="h6">{getStatusVerifiedText()}</Text>
              </View>
            </View>
            {getStatusVerifiedText() === 'Đã hết hạn' && (
              <Text underline mt={15}>
                Xác thực lại
              </Text>
            )}
          </View>

          <View style={[base.boxShadow]}>
            <View style={styles.heading}>
              <View>
                <Text bold fs="h5" mb={5}>
                  {translation.email_information}
                </Text>
                <Text style={styles.headingDesc}>
                  {translation.update_contact_information}
                </Text>
              </View>

              <TouchableOpacity
                style={base.leftAuto}
                onPress={() => {
                  if (PersonalInfo?.Email) {
                    Navigator.navigate(SCREEN.CHANGE_PASSWORD, {
                      type: 'update_email',
                      headerLabel: translation.common.authen,
                    });
                  } else {
                    Navigator.navigate(SCREEN.VERIFY_EMAIL, {
                      functionType: FUNCTION_TYPE.AUTH_EMAIL,
                    });
                  }
                }}
              >
                <Image
                  style={[styles.editBox]}
                  source={require('images/profile/Edit2.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={[base.row]}>
              <Image
                style={[styles.rowIcon]}
                source={require('images/profile/Email.png')}
              />
              {PersonalInfo?.Email ? (
                <Text fs="h6">{PersonalInfo.Email}</Text>
              ) : (
                <Text fs="h6">{translation.empty}</Text>
              )}
            </View>
          </View>
          <View style={{height: 40}}></View>
        </View>
      </ScrollView>
      <ActionSheet
        visible={!!showModal}
        setVisible={setShowModal}
        data={[
          {label: 'Chụp ảnh', onPress: () => onUpdateAvatar('camera')},
          {label: 'Chọn ảnh sẵn có', onPress: () => onUpdateAvatar('photo')},
        ]}
      />
      {showModalReVerify && (
        <Modal
          visible={showModalReVerify}
          onClose={() => onReVerify('hideModal')}
          title="Xác nhận đổi giấy tờ tùy thân"
          content="Giấy tờ tùy thân mới phải có thông tin họ tên, ngày sinh khớp với GTTT cũ. Bạn có chắc chắn muốn đổi không?" // TODO: translate
          icon={Images.Profile.ReVerify}
          buttonGroup={() => (
            <View style={styles.buttonGroup}>
              <Button
                mb={10}
                bold
                label="Có"
                onPress={() => {
                  onReVerify('hideModal');
                  Navigator.navigate(SCREEN.CHANGE_PASSWORD, {
                    type: 'update_account',
                    headerLabel: translation.common.authen,
                  });
                }}
              />
              <TouchableOpacity
                style={styles.textCenter}
                onPress={() => onReVerify('hideModal')}
              >
                <Text>Không, cảm ơn</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  avatar: {
    overflow: 'hidden',
    height: 120,
    width: 120,
    borderRadius: 99,
    backgroundColor: Colors.g4,
  },

  buttonGroup: {alignItems: 'center'},
  wedit: {
    overflow: 'hidden',
    borderRadius: 99,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    right: -10,
    width: 36,
    height: 36,

    backgroundColor: Colors.bs4,
    borderWidth: 1,
    borderColor: Colors.bs2,
  },
  heading: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  editBox: {
    width: scale(56),
    height: scale(56),
    marginTop: -10,
    marginRight: -10,
  },

  rowItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.g2,
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  rowFirst: {
    borderTopWidth: 0,
  },

  rowIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  //---------------
  flex1: {flex: 1},
  //---------------
  lh1: {lineHeight: 26},
  //---------------
  textCenter: {alignSelf: 'center'},
  //---------------
  iconEdit: {width: 18, height: 18, tintColor: Colors.g5},
  boxDisabled: {
    width: scale(56),
    height: scale(56),
    marginTop: -10,
    marginRight: -10,
    opacity: 0.3,
  },
});
export default UserInfo;
