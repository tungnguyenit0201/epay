import React from 'react';
import {
  View,
  Pressable,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from 'components';
import {Images, Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const DropDown = ({visible, setVisible, onPress, data, title}) => {
  const {height, width} = useWindowDimensions();
  const {bottom} = useSafeAreaInsets();

  return (
    // TODO: translate
    <Modal
      isVisible={visible}
      transparent={true}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={[styles.modal, {width: width, bottom: -bottom}]}>
        <View style={styles.header}>
          <Text bold fs="h6" centered color={Colors.brd1}>
            {title}
          </Text>
          <Pressable style={styles.btn} onPress={() => setVisible(false)}>
            <Image source={Images.WidthDraw.Plus} style={styles.img} />
          </Pressable>
        </View>

        <View style={[styles.wrap]}>
          {data?.map(item => {
            return (
              <View key={`${Math.random(1, 100)}-dropdown`}>
                <TouchableOpacity
                  onPress={() => {
                    onPress(item);
                    setVisible(false);
                  }}
                >
                  <Text fs="md" mb={Spacing.PADDING}>
                    {item?.label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.bs4,
    position: 'absolute',
    marginLeft: -Spacing.PADDING,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
  },
  wrap: {
    padding: Spacing.PADDING,
  },
  header: {
    padding: Spacing.PADDING,
    borderStyle: 'solid',
    borderBottomColor: Colors.bs2,
    borderBottomWidth: 1,
  },
  btn: {
    position: 'absolute',
    top: scale(20),
    right: Spacing.PADDING,
  },
  img: {
    height: scale(13),
    width: scale(13),
    transform: [{rotate: '45deg'}],
  },
});

export default DropDown;
