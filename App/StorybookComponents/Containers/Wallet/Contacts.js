import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import Text from '../../Atoms/Text';
import Icon from '../../Atoms/Icon';
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import TextInput from '../../Atoms/TextInput';

import {Colors, Fonts, Spacing, Images, base} from 'themes';
import {scale} from 'utils/Functions';
const Contacts = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [show, setShow] = useState(false);
  //const {data, onSearch} = useContacts();
  const listUsers = [
    {
      id: 1,
      name: 'Bảo An',
      phone: '0909000999',
      avatar: Images.Transfer.User_1,
    },
    {
      id: 2,
      name: 'Lâm VT',
      phone: '0909000999',
      avatar: Images.Transfer.User_2,
    },
    {
      id: 3,
      name: 'Bé Lan Anh',
      phone: '0909000999',
      avatar: Images.Transfer.User_3,
    },
    {
      id: 4,
      name: 'Trúc Linh',
      phone: '0909000999',
      avatar: Images.Transfer.User_4,
    },
    {
      id: 5,
      name: 'Trúc Linh',
      phone: '0909000999',
      avatar: Images.Transfer.User_4,
    },
  ];
  const renderHorizontal = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.blockHorizontal}
        onPress={() => console.log('press')}>
        <Image source={item.avatar.default} style={styles.avatar} />
        <Text bold>{item.name}</Text>
        <Text style={styles.fontSmall}>{item.phone}</Text>
      </TouchableOpacity>
    );
  };

  const renderVertical = ({item}) => (
    <TouchableOpacity style={styles.blockVertical}>
      <Image source={item.avatar.default} style={styles.avatar} />
      <View style={styles.ml_16}>
        <Text bold>{item.name}</Text>
        <Text style={styles.fontSmall}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleChange = e => {
    e ? setShow(true) : setShow(false);
  };
  return (
    <View style={styles.container}>
      <HeaderBg style={{marginBottom: 50}}>
        <Header
          title={'Xác nhận ' + translation.transfer_to_phone_number}
          back
        />
      </HeaderBg>
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
            onChange={handleChange}
          />
          {show ? (
            <TouchableOpacity style={styles.pr_10}>
              <Icon
                icon={Images.Transfer.CloseCircle}
                tintColor={Colors.g4}
                style={styles.closeCircle}
              />
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
        {/* Input with Icon */}
        {/* Icon Rectangle */}
        <Icon
          style={styles.iconRectangle}
          icon={Images.Transfer.Rectangle}
          tintColor={Colors.g2}
        />
        {/* Icon Rectangle */}
        <View>
          <Text bold style={styles.textTitle}>
            {translation.recent_transactions}
          </Text>
          <FlatList
            data={listUsers}
            renderItem={renderHorizontal}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.spacing}></View>
        <Text bold style={styles.textTitle}>
          {translation.epay_contact_book}
        </Text>
        <FlatList
          data={listUsers}
          renderItem={renderVertical}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING,
    flex: 1,
  },

  blockHorizontal: {
    marginRight: scale(14),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: scale(50),
    height: scale(50),
    marginBottom: scale(8),
  },
  fontSmall: {
    fontSize: Fonts.FONT_SMALL,
  },
  blockVertical: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  headerTitle: {
    color: Colors.white,
    fontSize: Fonts.H6,
    textAlign: 'center',
  },
  iconRectangle: {
    height: scale(8),
    width: '100%',
    marginVertical: scale(15),
  },
  textTitle: {
    fontSize: Fonts.H6,
    marginBottom: scale(16),
  },
  spacing: {
    marginTop: scale(20),
    marginBottom: scale(16),
  },

  inputIcon: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.g2,
    borderWidth: 1,
    borderRadius: scale(5),
  },
  iconSearch: {
    paddingHorizontal: scale(10),
    borderRightWidth: 1,
    borderColor: Colors.g2,
  },
  inputSearch: {
    flex: 1,
    //backgroundColor: 'transparent',
    fontSize: Fonts.H6,
    //borderColor: 'transparent',
  },
  closeCircle: {
    width: scale(20),
    height: scale(20),
  },
  pr_10: {
    paddingRight: scale(10),
  },
  ml_16: {
    marginLeft: scale(16),
  },
});
