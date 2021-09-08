import React, {useState} from 'react';
import {View, StyleSheet, Pressable, SafeAreaView} from 'react-native';
import Text from './Text';
import {scale} from 'utils/Functions';
import Modal from 'react-native-modal';
import {Colors} from 'themes';
import {FlatList} from 'react-native-gesture-handler';

let debugData = [];

const Debug = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Pressable
        style={styles.container}
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
    right: 0,
    top: 0,
    width: scale(70),
    height: scale(70),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: scale(10),
  },
});
