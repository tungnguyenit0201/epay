import React from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions, TouchableOpacity, Image, FlatList } from 'react-native';
import { useContacts } from 'context/Wallet/utils';
import { Text, InputBlock, Header, Button, FWLoading, TextInput, Icon } from 'components';
import { TEXT } from 'configs/Constants';
import { Colors, Fonts, Spacing, Images } from 'themes';
import Navigator from 'navigations/Navigator';
import { SCREEN } from 'configs/Constants';
import { scale } from 'utils/Functions';
import { useTranslation } from 'context/Language';
import HeaderBg from 'components/Common/HeaderBg';
const Contacts = () => {
  const translation = useTranslation();
  /* const {data, onSearch} = useContacts();

  const renderItem = ({item}) => (
    <Text>
      {item.givenName} {item.familyName}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Header back />
      {data === null ? (
        <FWLoading />
      ) : (
        <>
          <TextInput onChange={onSearch} placeholder={TEXT.SEARCH} />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.recordID}
          />
        </>
      )}
    </View> 
    
  );*/
  const listUsers = [
    {
      "id": 1,
      "name": "Bảo An",
      "phone": "0909000999",
      "avatar": Images.Transfer.User_1
    },
    {
      "id": 2,
      "name": "Lâm VT",
      "phone": "0909000999",
      "avatar": Images.Transfer.User_2
    },
    {
      "id": 3,
      "name": "Bé Lan Anh",
      "phone": "0909000999",
      "avatar": Images.Transfer.User_3
    },
    {
      "id": 4,
      "name": "Trúc Linh",
      "phone": "0909000999",
      "avatar": Images.Transfer.User_4
    },
    {
      "id": 5,
      "name": "Trúc Linh",
      "phone": "0909000999",
      "avatar": Images.Transfer.User_4
    },

  ]
  const renderHorizontal = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.blockHorizontal}
        onPress={() => Navigator.navigate(SCREEN.TRANSFER_PHONE)}
      >
        <Image
          source={item.avatar}
          style={styles.avatar}
        />
        <Text bold >{item.name}</Text>
        <Text style={styles.fontSmall}>{item.phone}</Text>
      </TouchableOpacity>
    )
  }

  const renderVertical = ({ item }) => (
    <TouchableOpacity style={styles.blockVertical}>
      <Image
        source={item.avatar}
        style={styles.avatar}
      />
      <View style={{ marginLeft: scale(16) }}>
        <Text bold >{item.name}</Text>
        <Text style={styles.fontSmall}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  )
  return (
    <View style={styles.container}>
      <HeaderBg style={styles.header}>
        <Text bold style={styles.headerTitle}>{translation.transfer_to_phone_number}</Text>
      </HeaderBg>
      <View style={styles.wrap}>
        <TextInput
          placeholder={translation.enter_name_or_phone_number}
          style={styles.inputBlock}
          placeholderTextColor={Colors.BLACK}
        />
        {/* Icon Rectangle */}
        <Icon
          style={styles.iconRectangle}
          icon={Images.Transfer.Rectangle}
          tintColor={Colors.g2}
        />
        {/* Icon Rectangle */}
        <View>
          <Text bold style={styles.textTitle}>{translation.recent_transactions}</Text>
          <FlatList
            data={listUsers}
            renderItem={renderHorizontal}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.spacing}></View>
        <Text bold style={styles.textTitle}>{translation.epay_contact_book}</Text>
        <FlatList
          data={listUsers}
          renderItem={renderVertical}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
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
    flex: 1
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockHorizontal: {
    marginRight: scale(14),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: scale(50),
    height: scale(50),
    marginBottom: scale(8)
  },
  fontSmall: {
    fontSize: Fonts.FONT_SMALL
  },
  blockVertical: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(16)
  },
  header: {
    height: scale(80),
  },
  headerTitle: {
    color: Colors.white, 
    marginTop: scale(35), 
    fontSize: Fonts.H6,
    textAlign: 'center'
  },
  iconRectangle: {
    height: scale(8),
    width: '100%',
    marginVertical: scale(15)
  },
  textTitle: {
    fontSize: Fonts.H6,
    marginBottom: scale(16)
  },
  spacing: {
    marginTop: scale(20),
    marginBottom: scale(16)
  },
  inputBlock: {
    fontSize: Fonts.H6,
    marginTop: scale(6),
    backgroundColor: 'transparent',
    borderColor: Colors.g4
  },
});