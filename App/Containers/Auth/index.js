import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import {Button, InputBlock} from 'components';
import {Colors, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {useAuth} from 'context/Auth/utils';
import {useCommon} from 'context/Common';

const Auth = () => {
  const {onChange, onPress} = useAuth();
  const translation = useTranslation();
  const {loading, setLoading} = useCommon();
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable
          onPress={() => Navigator.navigate(SCREEN.TAB_NAVIGATION)}
          style={{
            width: '100%',
            height: '50%',
            marginBottom: Spacing.PADDING,
          }}>
          <Image
            source={{
              uri: 'https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/6c/ee/02/6cee02e7-2fcc-9702-912b-1e9a8d251292/source/512x512bb.jpg',
            }}
            style={{
              flex: 1,
            }}
          />
        </Pressable>
        <InputBlock
          numeric
          label={translation.please_enter_your_phone_number}
          onChange={onChange}
        />
        <Button label={translation.continue} onPress={onPress} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  content: {
    paddingHorizontal: Spacing.PADDING,
    paddingVertical: Spacing.PADDING * 10,
    alignItems: 'center',
    flex: 1,
  },
});
export default Auth;
