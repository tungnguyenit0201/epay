import React from 'react';

import {
  ScrollView,
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Icon, Header, ActionSheet, Modal} from 'components';
import {SCREEN, PERSONAL_IC, GENDER} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

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
      name: 'Họ tên',
      val: PersonalInfo?.FullName || 'Chưa có',
    },
    {
      name: 'Ngày sinh',
      val: PersonalInfo?.DateOfBirth || 'Chưa có',
    },
    {
      name: 'Giới tính',
      val: GENDER[PersonalInfo?.SexType] || 'Chưa có',
    },
    {name: 'CMND', val: ICInfor?.ICNumber || 'Chưa có'},
    {
      name: 'Nơi cấp',
      val: ICInfor?.ICIssuedPlace || 'Chưa có',
    },
    {name: 'Địa chỉ', val: AddressInfo?.Provincial ? address : 'Chưa có'},
  ];

  return (
    <>
      <ScrollView>
        <View
          style={[
            base.container,
            {
              paddingTop: top + 10,
              paddingBottom: 20,
              backgroundColor: Colors.cl1,
            },
          ]}>
          <Pressable style={styles.left} onPress={() => Navigator.goBack()}>
            <Icon icon={Images.ArrowLeft} tintColor={Colors.white} size={30} />
          </Pressable>

          <View style={{alignItems: 'center'}}>
            <Pressable style={{marginBottom: 15}} onPress={onUpdateAvatar}>
              <View
                style={{
                  overflow: 'hidden',
                  height: 94,
                  with: 94,
                  borderRadius: 99,
                  backgroundColor: Colors.g4,
                }}>
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
              <View
                style={{
                  overflow: 'hidden',
                  borderRadius: 99,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bottom: 0,
                  right: -10,
                  width: 40,
                  height: 40,
                  backgroundColor: Colors.cl4,
                }}>
                <Image style={{width: 16, height: 16}} source={Images.Edit} />
              </View>
            </Pressable>

            <Text color={Colors.white} size={Fonts.FONT_MEDIUM_LARGE} mb={5}>
              {PersonalInfo?.FullName}
            </Text>
            <Text color={Colors.white} mb={10}>
              {phone}
            </Text>
            <Button
              disabled={statusVerified != PERSONAL_IC.INACTIVE}
              bg={Colors.cl4}
              radius={30}
              color={Colors.black}
              label={getStatusVerifiedText()}
              style={{minWidth: 150}}
              onPress={onVerify}
            />
          </View>
        </View>
        <View style={[base.container, styles.heading]}>
          <View style={styles.item}>
            <Text style={styles.title}>Thông tin cá nhân</Text>
            {statusVerified == PERSONAL_IC.ACTIVED && (
              <TouchableOpacity
                style={styles.itemRight}
                onPress={() => {
                  Navigator.push(SCREEN.EDIT_INFO);
                }}>
                <Text style={styles.link}>Chỉnh sửa</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {data.map((item, index) => {
          return (
            <View style={[base.container, styles.row]} key={index}>
              <View style={styles.item}>
                <Text>{item.name}</Text>
                <Text style={styles.textRight}>{item.val}</Text>
              </View>
            </View>
          );
        })}

        <View style={[base.container, styles.heading]}>
          <View style={styles.item}>
            <Text style={styles.title}>Thông tin tài khoản</Text>
          </View>
        </View>
        <View style={[base.container, styles.row]}>
          <View style={styles.item}>
            <Text>{getStatusVerifiedText()}</Text>
            {statusVerified != PERSONAL_IC.VERIFYING && (
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

        <View style={[base.container, styles.heading]}>
          <View style={styles.item}>
            <Text style={styles.title}>Thông tin Email</Text>
          </View>
        </View>
        <View style={[base.container, styles.row]}>
          {PersonalInfo?.Email ? (
            <View style={styles.item}>
              <Text>{PersonalInfo.Email}</Text>
              <TouchableOpacity
                style={styles.itemRight}
                onPress={() => {
                  Navigator.push(SCREEN.CHANGE_PASSWORD, {
                    type: 'update_email',
                    headerLabel: 'Nhập mật khẩu',
                  });
                }}>
                <Text style={styles.link}>Chỉnh sửa</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.item}>
              <Text>Chưa có</Text>
              <TouchableOpacity
                style={styles.itemRight}
                onPress={() => {
                  Navigator.push(SCREEN.VERIFY_EMAIL);
                }}>
                <Text style={styles.link}>Thêm email</Text>
              </TouchableOpacity>
            </View>
          )}
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
  heading: {
    marginTop: 20,
    borderBottomColor: Colors.l4,
    borderBottomWidth: 1,
  },
  title: {
    textTransform: 'uppercase',
  },
  link: {
    textDecorationLine: 'underline',
  },
  row: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.l4,
    borderBottomWidth: 1,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  itemRight: {
    marginLeft: 'auto',
  },
  textRight: {
    marginLeft: 'auto',
    width: scale(180),
    textAlign: 'right',
  },
});
export default UserInfo;
