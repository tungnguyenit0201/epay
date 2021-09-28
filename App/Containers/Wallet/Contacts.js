import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
//import {useContacts} from 'context/Wallet/utils';
import {Text, HeaderBg, Header, TextInput, Icon} from 'components';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';

import SearchContact from 'components/Wallet/SearchContact';

const Contacts = () => {
  const translation = useTranslation();
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
        onPress={() => Navigator.navigate(SCREEN.QR_TRANSFER)}>
        <Image source={item.avatar} style={styles.avatar} />
        <Text bold>{item.name}</Text>
        <Text style={styles.fontSmall}>{item.phone}</Text>
      </TouchableOpacity>
    );
  };

  const renderVertical = ({item}) => (
    <TouchableOpacity
      style={styles.blockVertical}
      onPress={() => Navigator.navigate(SCREEN.QR_TRANSFER)}>
      <Image source={item.avatar} style={styles.avatar} />
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
    <>
      <HeaderBg>
        <Header back title={translation.transfer_to_phone_number} />
        <SearchContact style={{marginTop: 10}} />
      </HeaderBg>
      <View style={base.wrap}>
        <View style={base.container}>
          <View style={styles.block}>
            <Text bold fs="h6" mb={15}>
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

          <Text bold fs="h6" mb={15}>
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
      <Image source={require('images/wave.png')} style={styles.bgImg} />
    </>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  block: {
    marginBottom: 40,
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

  ml_16: {
    marginLeft: scale(16),
  },

  bgImg: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
