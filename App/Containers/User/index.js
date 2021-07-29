import React, {useEffect, useState} from 'react';
import Login from 'components/User/Login';
import {Text, Button} from 'components';
import {ScrollView, View} from 'react-native';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing,  base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const User = () => {
  const {top} = useSafeAreaInsets();
  return (
    <ScrollView>
      <View style={[base.container,{paddingTop:top+10, paddingBottom:10, marginBottom:20, backgroundColor:Colors.cl1}]}>
      <Text>Nguyễn Văn A</Text>
      <Text>9999đ</Text>
      <Button
        label="Thông tin cá nhân"
        onPress={() => Navigator.push(SCREEN.USER_INFO)}
      />
      <Button
        label="Xác thực tài khoản"
        onPress={() => Navigator.push(SCREEN.VERIFY_USER_INFO)}
      />
      <Button
        
        label="Ngân hàng liên kết (2) fff"
        onPress={() => Navigator.push(SCREEN.BANK)}
      />




      </View>

      <Button
        bg={Colors.cl2}
        color={Colors.g9}    
        fs={20}  
        label="sssss"
        label2="(60s)"
        label2Style={{ color:'#f00', fontSize:30}}
      />


      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>
      <Text>Cài đặt</Text>

      <Button
        label="Cài đặt thanh toán"
        onPress={() => Navigator.push(SCREEN.PAYMENT_SETTINGS)}
      />
      <Button
        label="Mật khẩu và bảo mật"
        onPress={() => Navigator.push(SCREEN.SECURITY)}
      />
    </ScrollView>
  );
};
export default User;
