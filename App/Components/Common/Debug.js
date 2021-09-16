import React, {useState} from 'react';
import {View, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import Text from './Text';
import {scale} from 'utils/Functions';
import Modal from 'react-native-modal';
import {Colors} from 'themes';
import {FlatList} from 'react-native-gesture-handler';
import Navigator from 'navigations/Navigator';
import {useAuth} from 'context/Auth/utils';
import {useAsyncStorage} from 'context/Common/utils';

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
          Navigator.getCurrentRoute().name === 'Auth' &&
            onLoginByTouchID({phone: await getPhone()});
        }}
        onLongPress={() => {
          setShow(true);
        }}
      />
      <Modal animationType="slide" transparent={true} visible={show}>
        <SafeAreaView style={styles.modalContainer}>
          <Pressable
            onPress={() => setShow(false)}
            style={{alignSelf: 'flex-end'}}>
            <Text>Close</Text>
          </Pressable>
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
        </SafeAreaView>
      </Modal>
    </>
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
    height: scale(70),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: scale(10),
  },
});
