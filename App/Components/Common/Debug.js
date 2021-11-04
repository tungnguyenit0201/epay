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
import useServiceCommon from 'services/common';
import {useUser} from 'context/User';
import KYC_TYPE from 'configs/Enums/KYCType';

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
            {/*<KYCTypePicker onclose={() => setShow(false)} />*/}
            <Text fs="h6" bold>
              API logs:
            </Text>
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
  const {getConfigInfo} = useServiceCommon();

  return (
    <View>
      <Text fs="h5" bold>
        Choose domain:
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {API.ROOT_LIST.map(item => {
          return (
            <Pressable
              onPress={() => {
                onChangeDomain(item);
                onclose();
                getConfigInfo();
              }}
              key={item}
            >
              <Text
                fs="md"
                style={[
                  styles.serverItem,
                  domain === item ? {color: Colors.tp1} : {},
                ]}
              >
                {item.split('//')[1].split('.')[0]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const KYCTypePicker = ({onclose}) => {
  const {kycType, dispatch} = useUser();

  return (
    <View>
      <Text fs="h5" bold>
        Choose KYC type:
      </Text>
      <View style={{flexDirection: 'row'}}>
        {[KYC_TYPE.KYC, KYC_TYPE.EKYC].map(item => {
          return (
            <Pressable
              onPress={() => {
                onclose();
                dispatch({type: 'SET_KYC_TYPE', data: item});
              }}
              key={item}
            >
              <Text
                fs="md"
                style={[
                  styles.serverItem,
                  {marginRight: scale(50)},
                  kycType === item ? {color: Colors.tp1} : {},
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const addLog = data => {
  debugData.push(data);
  debugData.length > 5 && (debugData = debugData.slice(1));
};

export default Debug;
export {debugData, addLog};

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
    marginTop: scale(50),
  },
  serverItem: {
    // fontSize: LG,
    paddingBottom: scale(6),
  },
});
