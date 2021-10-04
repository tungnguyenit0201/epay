import React, {useState, useEffect} from 'react';
import {View, Keyboard, StyleSheet, Pressable} from 'react-native';
import {Button} from 'components';
import {base, Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import Text from './Text';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {style} from 'dom-helpers';

// optionList: [{label, value}]
const KeyboardSuggestion = ({
  optionList,
  onPress,
  onContinue,
  isContinueEnabled,
}) => {
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

  return (
    <View style={styles.container}>
      <View
        style={[
          base.boxBottom,
          styles.continueContainer,
          {
            paddingBottom: isShow ? 0 : 30,
          },
        ]}>
        <Button
          style={styles.continue}
          size={'xss'}
          label="Tiếp tục"
          onPress={onContinue}
          disabled={!isContinueEnabled}
        />
      </View>

      {isShow ? (
        <View
          style={{
            // backgroundColor: Colors.l2,
            paddingVertical: scale(8),
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            backgroundColor: Colors.white,
          }}>
          {optionList &&
            optionList.map(option => {
              return (
                <TouchableOpacity
                  onPress={() => onPressOption(option.value)}
                  key={option.value}>
                  <Text bold style={styles.option}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  option: {
    textAlign: 'center',
    lineHeight: 40,
    backgroundColor: Colors.moneyItem,
    borderRadius: 8,
    height: 40,
    overflow: 'hidden',
    color: Colors.cl1,
    paddingHorizontal: 25,
  },
  continueContainer: {
    padding: scale(16),
    paddingBottom: 0,
  },
  continue: {
    height: scale(48),
  },
});

export default React.memo(KeyboardSuggestion);

{
  /* <Pressable
              key={option.value}
              onPress={() => onPressOption(option.value)}>
              <Text bold style={styles.option}>
                {option.label}
              </Text>
            </Pressable> */
}
