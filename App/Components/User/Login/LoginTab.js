import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, InputBlock, Picker} from 'components';
import Colors from 'themes/Colors';
import {scale} from 'utils/Functions';
import {LOGIN} from 'actions/user';
import {Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';

const LoginTab = ({onLoading, onLoginFailed}) => {
  const {width} = useWindowDimensions();
  let [modalVisible, setModalVisible] = useState(false);

  const contentRef = useRef({
    username: '',
    password: '',
    email: '',
  });

  const onLogin = () => {
    const {username, password} = contentRef.current;
    if (!username || !password) {
      //   Alert.alert('');
      return;
    }
    onLoading && onLoading(true);
    // dispatch(LOGIN.REQUEST({username, password}));
  };

  const onChange = (type, value) => {
    contentRef.current[type] = value;
  };

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          width: width,
          paddingHorizontal: scale(15),
        }}
        contentContainerStyle={{paddingVertical: scale(35)}}>
        <InputBlock
          label="Email"
          onChange={value => onChange('username', value)}
        />
        <InputBlock
          label="Mật khẩu"
          password
          onChange={value => onChange('password', value)}
        />
        <Button
          label="Đăng nhập"
          onPress={onLogin}
          backgroundColor={Colors.BLACKTEXT}
          style={{marginTop: scale(5)}}
        />
        <Text
          onPress={() => {
            Navigator.navigate('ForgotPassword');
          }}
          style={styles.forgetPassword}>
          Quên mật khẩu?
        </Text>
        <Text
          style={{
            color: Colors.BLACKTEXT,
            marginTop: Spacing.PADDING,
            alignSelf: 'center',
          }}>
          Hoặc
        </Text>
      </ScrollView>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalSubContainer,
            {
              display: modalVisible ? 'flex' : 'none',
            },
          ]}>
          <View style={styles.modalContent}>
            <Text style={{fontSize: Fonts.FONT_MEDIUM_LARGE}}>
              Chỉ cần 1 bước nữa thôi!
            </Text>
            <InputBlock
              label="Email"
              onChange={value => onChange('email', value)}
            />
            <View style={styles.actionModal}>
              <TouchableOpacity
                style={styles.action}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text>Huỷ</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.action, {fontWeight: '500'}]}
                onPress={() => loginFB(contentRef.current?.email)}>
                <Text>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(LoginTab);

const styles = StyleSheet.create({
  forgetPassword: {
    color: Colors.PRIMARY,
    textDecorationLine: 'underline',
    alignSelf: 'center',
    marginTop: scale(17),
  },
  modal: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  modalSubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.PADDING,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.BLACKTEXT,
  },
  modalContent: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
    width: '80%',
    padding: Spacing.PADDING,
    borderRadius: 5,
  },
  actionModal: {
    flexDirection: 'row',
    paddingVertical: Spacing.PADDING / 2,
  },
  action: {flex: 1, alignItems: 'center'},
});
