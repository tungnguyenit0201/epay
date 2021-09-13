import React, {useState, useEffect} from 'react';
import {View, Keyboard, StyleSheet, Pressable} from 'react-native';
import {Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import Text from '../Atoms/Text';

// optionList: [{label, value}]
const KeyboardSuggestion = ({optionList, onPress}) => {
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardWillShow', () => {
      setShow(true);
    });
    const hideListener = Keyboard.addListener('keyboardWillHide', () => {
      setShow(false);
    });
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  const onPressOption = value => {
    onPress && onPress(value);
    Keyboard.dismiss();
  };

  return isShow ? (
    <View style={styles.container}>
      {optionList &&
        optionList.map(option => {
          return (
            <Pressable
              key={option.value}
              onPress={() => onPressOption(option.value)}>
              <Text bold style={styles.option}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.l2,
    paddingVertical: Spacing.PADDING,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  option: {
    padding: scale(10),
    borderWidth: 1,
    borderColor: Colors.BLACKTEXT,
  },
});

export default React.memo(KeyboardSuggestion);
