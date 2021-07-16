import React from 'react';
import {Modal, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Spacing, Colors} from 'themes';
import {Text, Button} from 'components';
const Alert = () => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={[styles.container, {width: width, height: height}]}>
      <Modal visible={true} style={{flex: 1, width: width, height: height}}>
        <Text>Hello World!</Text>
        <Button onPress={() => true}>
          <Text>Hide Modal</Text>
        </Button>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    opacity: 0.8,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Alert;
