import {useError} from 'context/Common/utils';
import React, {useEffect, useState, useRef} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';

const useContacts = () => {
  const [data, setData] = useState(null);
  const {setError} = useError();

  const contentRef = useRef({
    contacts: null,
  });

  const onSearch = value => {
    const fields = ['givenName', 'familyName', 'middleName'];
    if (!value) {
      setData(contentRef.current.contacts);
      return;
    }
    let filteredData = contentRef.current.contacts.filter(
      item =>
        fields.filter(
          field => item[field].toUpperCase().search(value.toUpperCase()) !== -1,
        ).length,
    );
    setData(filteredData);
  };

  const loadData = async () => {
    Contacts.getAll()
      .then(contacts => {
        contentRef.current.contacts = contacts;
        setData(contacts);
      })
      .catch(e => {
        setError({ErrorCode: -1, ErrorMessage: 'Không thể truy cập danh bạ.'});
      });
    Contacts.checkPermission();
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        loadData();
      });
    } else {
      loadData();
    }
  }, []); // eslint-disable-line

  return {data, onSearch};
};

export default useContacts;
