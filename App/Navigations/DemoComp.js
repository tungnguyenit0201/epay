import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Button, InputBlock} from 'components';
import {Colors, Images, Spacing, base, Row,Col, Var} from 'themes';
import Navigator from 'navigations/Navigator';
import {useUser} from '../../Context/User';
import {SCREEN} from 'configs/Constants';

const Splash = () => {
  const {userInfo} = useUser();
  console.log('userInfo :>> ', userInfo);
  return (
    <View style={base.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: 'https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/6c/ee/02/6cee02e7-2fcc-9702-912b-1e9a8d251292/source/512x512bb.jpg',
          }}
          style={{width: '100%', height: '50%'}}
        />
        <InputBlock numeric label="Nhập số điện thoại" />


        <Row space="10" >
          <Col space="10" width="50%">
            <Button
              label="Đăng nhập"
              onPress={() => Navigator.navigate(SCREEN.LOGIN)}
            />
          </Col>
          <Col space="10" width="50%">
            <Button
              label="Quên mật khẩu"
              onPress={() => Navigator.navigate(SCREEN.FORGET_PASSWORD)}
            />
          </Col>          
        </Row>
        



        <Button
            disabled={true}
            label="Demo" 
            border='#fff'
            color='#f00'
            bg='#999'
            size="lg"
            fs={30}
            radius={50}
            mt={150}
            onPress={() => Navigator.navigate(SCREEN.DEMO)}
          />
  


      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  row :{
    flexDirection: 'row',
    justifyContent: 'space-between',
    //flex:1,
    padding:30,
    //flexDirection:'column',

  },
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  content: {
    //paddingHorizontal: Spacing.PADDING,
    //paddingVertical: Spacing.PADDING * 10,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    //flex: 1,
  },
  baseText: {
    fontWeight: 'bold',
    backgroundColor:'#aaa',

  },
  innerText: {
    color: 'red'
  }  
});
export default Splash;
