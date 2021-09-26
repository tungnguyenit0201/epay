import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
//import {useContacts} from 'context/Wallet/utils';
import {Text, HeaderBg, TextInput, Icon, Header} from 'components';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import LinearView from 'components/Common/LinearView';
import {useContacts} from 'context/Wallet/utils';
import EPayAvatar from 'components/Common/EPayAvatar';

const Contacts = () => {
  const translation = useTranslation();
  const contactContext = useContacts();
  const [show, setShow] = useState(false);
  const [listContact, setListContact] = useState([]);

  useEffect(() => {
    if (contactContext?.data?.length !== listContact?.length) {
      setListContact(contactContext.data);
    }
  }, [contactContext, listContact]);
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
        onPress={() =>
          Navigator.navigate(SCREEN.TRANSFER_PHONE, {ePayUser: item})
        }>
        <View style={styles.avatarHorizontalWrapper}>
          <EPayAvatar avatar={item?.avatar} name={item?.name} />
        </View>
        <Text>{item.name}</Text>
        <Text style={styles.fontSmall}>{item.phone}</Text>
      </TouchableOpacity>
    );
  };

  const renderVertical = ({item}) => {
    const showName = [item.familyName, item.middleName, item.givenName].join(
      ' ',
    );
    return (
      <TouchableOpacity style={styles.blockVertical}>
        <EPayAvatar avatar={item?.avatar} name={showName} />
        <View style={styles.ml_16}>
          <Text>{showName}</Text>
          <Text style={styles.fontSmall}>{item.phoneNumbers[0].number}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleChange = e => {
    e ? setShow(true) : setShow(false);
  };
  return (
    <>
      <HeaderBg>
        <Header
          back
          title={translation.transfer_to_phone_number}
          style={{marginBottom: 25}}
        />
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder={translation.enter_name_or_phone_number}
            numeric
            onChange={handleChange}
            leftIcon={Images.SearchLinear}
            isDeleted={show}
            style={styles.inputSearch}
            placeholderTextColor={Colors.gray}
          />
        </View>
      </HeaderBg>
      <View style={styles.wrap}>
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
          data={listContact}
          renderItem={renderVertical}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  fontSmall: {
    fontSize: Fonts.FONT_SMALL,
    color: Colors.cl3,
  },
  blockVertical: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16),
  },
  textTitle: {
    fontSize: Fonts.H6,
    marginBottom: scale(16),
  },
  spacing: {
    marginTop: scale(20),
    marginBottom: scale(16),
  },
  inputSearch: {
    borderRadius: scale(8),
  },
  ml_16: {
    marginLeft: scale(16),
  },
  avatarHorizontalWrapper: {
    marginBottom: scale(8),
  },
  wrap: {
    padding: scale(16),
  },
  searchWrapper: {
    paddingHorizontal: scale(16),
  },
});
