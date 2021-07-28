import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useContacts} from 'context/Wallet/utils';
import {FWLoading, Header, Text, TextInput} from 'components';
import {TEXT} from 'configs/Constants';

const Contacts = () => {
  const {data, onSearch} = useContacts();

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
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
