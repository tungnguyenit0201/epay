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
import {SCREEN, PERSONAL_IC, GENDER} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

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

  const address =
    AddressInfo?.Address +
    ', ' +
    AddressInfo?.Ward +
    ', ' +
    AddressInfo?.County +
    ', ' +
    AddressInfo?.Provincial;
  const data = [
    {
      icon: require('images/profile/NapVI.png'),
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
    <>
      <HeaderBg mb={0}>
        <Header back title="Trang cá nhân" />
      </HeaderBg>
      <ScrollView style={[{paddingTop: 20}]}>
        <View style={[base.container]}>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Pressable style={{marginBottom: 15}} onPress={onUpdateAvatar}>
              <View style={styles.avatar}>
                <Image
                  style={{width: 94, height: 94}}
                  source={
                    PersonalInfo?.Avatar
                      ? {uri: PersonalInfo.Avatar}
                      : Images.DefaultUser
                  }
                  resizeMode="cover"
                />
              </View>
              <View style={styles.wedit}>
                <Image
                  style={{width: 16, height: 16, tintColor: Colors.g5}}
                  source={Images.Edit}
                />
              </View>
            </Pressable>

            <Text fs="h5" bold mb={5}>
              {PersonalInfo?.FullName}
            </Text>
            <Text mb={10}>{phone}</Text>

            <StatusUser />
          </View>

          <DinhDanh />

          <View style={[base.boxShadow]}>
            <View style={styles.heading}>
              <View>
                <Text bold fs="h5" mb={5}>
                  Thông tin cá nhân
                </Text>
                <Text style={styles.headingDesc}>
                  TLorem Ipsum is simply dummy...
                </Text>
              </View>

              {statusVerified == PERSONAL_IC.ACTIVED && (
                <TouchableOpacity
                  style={base.leftAuto}
                  onPress={() => {
                    Navigator.push(SCREEN.EDIT_INFO);
                  }}>
                  <Image
                    style={[styles.editBox]}
                    source={require('images/profile/Edit2.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
            {data.map((item, index) => {
              return (
                <View
                  style={[
                    styles.rowItem,
                    base.row,
                    index == 0 && styles.rowFirst,
                  ]}
                  key={index}>
                  <Image style={[styles.rowIcon]} source={item.icon} />
                  <Text style={styles.rowTitle}>{item.name}</Text>
                  <Text style={base.leftAuto}>{item.val}</Text>
                </View>
              );
            })}
            <View style={[styles.rowItem]}>
              <Image
                style={[styles.rowIcon]}
                source={require('images/profile/CMND.png')}
              />
              <View>
                <Text mt={3} mb={5} style={styles.rowTitle}>
                  CMND/CCCD/Hộ chiếu
                </Text>
                <Text style={[styles.rowVal]}>
                  {ICInfor?.ICNumber || <Text color={Colors.g4}>Chưa có</Text>}
                </Text>
              </View>
            </View>
            <View style={[styles.rowItem]}>
              <Image
                style={[styles.rowIcon]}
                source={require('images/profile/Location.png')}
              />
              <View>
                <Text mt={3} mb={5} style={styles.rowTitle}>
                  Địa chỉ
                </Text>
                <Text style={[styles.rowVal]}>
                  {AddressInfo?.Provincial ? (
                    address
                  ) : (
                    <Text color={Colors.g4}>Chưa có</Text>
                  )}
                </Text>
              </View>
            </View>
          </View>

          <View style={[base.boxShadow]}>
            <View style={styles.heading}>
              <View>
                <Text bold fs="h5" mb={5}>
                  Thông tin tài khoản
                </Text>
                <Text style={styles.headingDesc}>
                  TLorem Ipsum is simply dummy...
                </Text>
              </View>

              <TouchableOpacity
                style={base.leftAuto}
                onPress={() => {
                  Navigator.push(SCREEN.EDIT_INFO);
                }}>
                <Image
                  style={[styles.editBox]}
                  source={require('images/profile/Edit2.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={[base.row]}>
              <Image
                style={[styles.rowIcon]}
                source={require('images/profile/Wating.png')}
              />
              <View>
                <Text style={styles.rowVal}>{getStatusVerifiedText()}</Text>
                {statusVerified != PERSONAL_IC.VERIFYING &&
                  statusVerified != PERSONAL_IC.RE_VERIFYING && (
                    <TouchableOpacity
                      style={styles.itemRight}
                      onPress={
                        statusVerified == PERSONAL_IC.INACTIVE
                          ? onVerify
                          : () => onReVerify('showModal')
                      }>
                      <Text style={styles.link}>
                        {statusVerified == PERSONAL_IC.INACTIVE
                          ? 'Xác thực tài khoản'
                          : 'Đổi giấy tờ tùy thân'}
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>
            </View>
          </View>

          <View style={[base.boxShadow]}>
            <View style={styles.heading}>
              <View>
                <Text bold fs="h5" mb={5}>
                  Thông tin Email
                </Text>
                <Text style={styles.headingDesc}>
                  TLorem Ipsum is simply dummy...
                </Text>
              </View>

              {PersonalInfo?.Email && (
                <TouchableOpacity
                  style={base.leftAuto}
                  onPress={() => {
                    Navigator.push(SCREEN.CHANGE_PASSWORD, {
                      type: 'update_email',
                      headerLabel: 'Nhập mật khẩu',
                    });
                  }}>
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
                source={require('images/profile/Email.png')}
              />
              {PersonalInfo?.Email ? (
                <Text style={styles.rowTitle}>{PersonalInfo.Email}</Text>
              ) : (
                <>
                  <Text color={Colors.g4}>Chưa có</Text>
                  <TouchableOpacity
                    style={base.leftAuto}
                    onPress={() => {
                      Navigator.push(SCREEN.VERIFY_EMAIL);
                    }}>
                    <Text style={styles.link}>Thêm email</Text>
                  </TouchableOpacity>
                </>
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
          content="Giấy tờ tùy thân mới phải có thông tin họ tên, ngày sinh khớp với 
        GTTT cũ. Bạn có chắc chắn muốn 
        đổi không?" // TODO: translate
          buttonGroup={() => (
            <View style={styles.buttonGroup}>
              <Button mb={10} label="Có" onPress={onReVerify} />
              <TouchableOpacity onPress={() => onReVerify('hideModal')}>
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
    height: 94,
    width: 94,
    borderRadius: 99,
    backgroundColor: Colors.g4,
  },
  wedit: {
    overflow: 'hidden',
    borderRadius: 99,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    right: -10,
    width: 40,
    height: 40,

    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.cl4,
  },
  heading: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  editBox: {
    width: scale(46),
    height: scale(46),
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
  rowTitle: {
    fontSize: Fonts.H6,
    fontWeight: '500',
  },
  rowVal: {
    //color: Colors.g2,
  },
});
export default UserInfo;
