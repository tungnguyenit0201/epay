import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {TextInput, Icon} from 'components';
import {Colors, Fonts, Spacing, Images, base} from 'themes';

import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';

const SearchContact = ({style}) => {
  const translation = useTranslation();
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  //const {data, onSearch} = useContacts();

  const handleChange = e => {
    //e ? setShow(true) : setShow(false);
    setData(e);
  };
  return (
    <>
      {/*old code, delete when no use anymore
      <View style={[styles.wrapSearch, style]}>
        <TouchableOpacity style={styles.iconSearch}>
          <Image source={require('images/Search.png')} style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.inputSearch}
          placeholder={translation.enter_name_or_phone_number}
          placeholderTextColor={Colors.g4}
          onChange={handleChange}
        />
        {show && (
          <TouchableOpacity>
            <Icon
              icon={Images.Transfer.CloseCircle}
              tintColor={Colors.g4}
              style={styles.closeCircle}
            />
          </TouchableOpacity>
        )}
      </View> */}

      <View style={style}>
        <TextInput
          style={styles.inputSearch}
          placeholder={translation.enter_name_or_phone_number}
          placeholderTextColor={Colors.g4}
          onChange={handleChange}
          value={data}
          leftIcon={require('images/Search.png')}
          isDeleted
        />
      </View>
    </>
  );
};

export default SearchContact;

const styles = StyleSheet.create({
  // wrapSearch: {
  //   flexWrap: 'wrap',
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: Colors.white,
  //   height: 48,
  //   borderRadius: scale(8),
  // },
  // iconSearch: {
  //   paddingHorizontal: scale(10),
  //   borderRightWidth: 1,
  //   borderColor: Colors.g2,
  //   marginRight: 5,
  // },
  // icon: {
  //   width: 18,
  //   height: 18,
  // },
  // inputSearch: {
  //   height: 24,
  //   borderWidth: 0,
  //   flex: 1,
  //   fontSize: Fonts.H6,
  // },
  // closeCircle: {
  //   width: scale(20),
  //   height: scale(20),
  // },
});
