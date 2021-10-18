import React, {useState} from 'react';
import {View, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import Text from './Text';
import {scale} from 'utils/Functions';
import Modal from 'react-native-modal';
import {Colors} from 'themes';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Navigator from 'navigations/Navigator';
import {useAuth} from 'context/Auth/utils';
import {useAsyncStorage, useRequest} from 'context/Common/utils';
import API from 'configs/API';

let debugData = [];

const Debug = () => {
  const [show, setShow] = useState(false);
  const {onLoginByTouchID} = useAuth();
  const {getPhone} = useAsyncStorage();

  return (
    <>
      <Pressable
        style={styles.container}
        onPress={async () => {
          __DEV__ &&
            ['Auth', 'Login'].includes(Navigator.getCurrentRoute().name) &&
            onLoginByTouchID({phone: await getPhone()});
        }}
        onLongPress={() => {
          setShow(true);
        }}
      />
      <Modal animationType="slide" transparent={false} visible={show}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={{padding: scale(10), flex: 1}}>
            <Pressable
              onPress={() => setShow(false)}
              style={{alignSelf: 'flex-end'}}
            >
              <Text>Close</Text>
            </Pressable>
            <DomainPicker onclose={() => setShow(false)} />
            <FlatList
              data={debugData}
              style={{padding: scale(10)}}
              renderItem={({item}) => {
                return (
                  <>
                    <Text>{JSON.stringify(item?.data || item)}</Text>
                    <View style={{height: scale(100)}} />
                  </>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const DomainPicker = ({onclose}) => {
  const {domain, onChangeDomain} = useRequest();
  return (
    <View>
      <Text fs="h5">Choose domain:</Text>
      {API.ROOT_LIST.map(item => {
        return (
          <TouchableOpacity
            onPress={() => {
              onChangeDomain(item);
              onclose();
            }}
            key={item}
          >
            <Text
              fs="md"
              style={[
                styles.serverItem,
                domain === item ? {color: Colors.cl1} : {},
              ]}
            >
              {item.split('//')[1].split('.')[0]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Debug;
export {debugData};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '37%',
    top: 0,
    width: scale(100),
    height: scale(100),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.bs4,
    borderRadius: scale(10),
    marginTop: scale(200),
  },
  serverItem: {
    // fontSize: LG,
    paddingBottom: scale(6),
  },
});
