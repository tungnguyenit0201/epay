import React from 'react';

import {ScrollView,Pressable, View,Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Button,Text, Icon, Header} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing,  base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

const UserInfo = () => {
  const {top} = useSafeAreaInsets();

  const data = [
    {name: 'Họ tên', val: 'Nguyen van an'},
    {name: 'Ngày sinh', val: '09/09/1999'},
    {name: 'Giới tính', val: 'Nam'},
    {name: 'CMND', val: 'sss'},
    {name: 'Nơi cấp', val: 'sss'},
    {name: 'Địa chỉ', val: 'sss'},
  ];    
  return (
    <>

    <ScrollView>
      <View style={[base.container,{paddingTop:top+10, paddingBottom:20,  backgroundColor:Colors.cl1}]}>
        <Pressable
          style={styles.left}
          onPress={() => Navigator.goBack()}
          >
            <Icon icon={Images.ArrowLeft} tintColor={Colors.white} size={30}/>
        </Pressable>        

        <View style={{ alignItems:'center', }}>
          <View style={{position:'relative',  marginBottom:15}}>
            <View style={{overflow:'hidden',  height:94, with:94, borderRadius:99, backgroundColor:Colors.black}}>
              <Image
                style={{width: 94,height: 94}}
                source={Images.MoMo}
              />
            </View>
            <View 
              style={{
                overflow:'hidden', borderRadius:99, position:'absolute', alignItems:'center', justifyContent:'center', bottom:0, right:-10, width: 40, height: 40, backgroundColor: Colors.cl4
              }}               
            >
              <Image
                style={{width: 16,height: 16}}
                source={Images.Edit}
              />
            </View>            
          </View>

          <Text color="#fff" size={Fonts.FONT_MEDIUM_LARGE} mb={5}>Nguyễn Văn A</Text>
          <Text color="#fff" mb={10}>0908000000</Text>
          <Button
            bg={Colors.cl4}
            radius={30}
            color={Colors.black}
            label="Đã xác thực"
            style={{minWidth:150}}
            onPress={() => Navigator.push(SCREEN.VERIFY_USER_INFO)}
          />              
        </View>
        
      </View>
      <View style={[base.container, styles.heading]}>
        <View style={styles.item}>
          <Text style={styles.title}>Thông tin cá nhân</Text>
          <TouchableOpacity
            style={styles.itemRight}
            onPress={() => { Navigator.push(SCREEN.EDIT_INFO); }}>
            <Text style={styles.link} >Chỉnh sửa</Text>      
          </TouchableOpacity>    
        </View>
      </View>
      {data.map((item,index) => {     
        return (    
        <View style={[base.container, styles.row]} key={index}>
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text style={styles.itemRight}>{item.val}</Text>          
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
          <Text>Đã xác thực</Text>
          <TouchableOpacity
            style={styles.itemRight}
            onPress={() => {
              Navigator.push(SCREEN.NOTIFICATION);
            }}>
            <Text style={styles.link} >Chỉnh sửa</Text>      
          </TouchableOpacity>      
        </View>
      </View>
    
      <View style={[base.container, styles.heading]}>
        <View style={styles.item}>
          <Text style={styles.title}>Thông tin Email</Text>
        </View>
      </View>
      <View style={[base.container, styles.row]}>
        <View style={styles.item}>
          <Text>Chưa có</Text>
          <TouchableOpacity
            style={styles.itemRight}
            onPress={() => {
              Navigator.push(SCREEN.NOTIFICATION);
            }}>
            <Text style={styles.link} >Thêm email</Text>      
          </TouchableOpacity>      
        </View>
      </View>
       
    </ScrollView>    
    </>
  );
};
const styles = StyleSheet.create({
  heading: {
    marginTop:20,
    borderBottomColor:Colors.l4,
    borderBottomWidth:1    
  },  
  title: {
    textTransform:'uppercase'
  },   
  link: {
    textDecorationLine: 'underline'
  },   
  row: {
    backgroundColor:Colors.white,
    borderBottomColor:Colors.l4,
    borderBottomWidth:1
  },
  item: {
    flexDirection:'row',
    paddingVertical:12,
  },  
  itemRight: {
    marginLeft:'auto'
  },  
});
export default UserInfo;


