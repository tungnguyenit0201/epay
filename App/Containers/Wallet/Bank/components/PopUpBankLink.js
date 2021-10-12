import React, {useRef} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {Button, Radio, Text, SecondaryButton} from 'components';
import {useTranslation} from 'context/Language';
import {Colors, Spacing, Images} from 'themes';

const PopUpBankLink = props => {
  const {kycInfo, onChooseIc, onContinue, requestClose} = props || {};
  const translation = useTranslation();
  const selectedItem = useRef(kycInfo?.[0]);

  const handleChange = item => {
    selectedItem.current = item;
    // onChooseIc?.(item);
  };

  const renderOptionIc = () => {
    if (!Array.isArray(kycInfo)) {
      return null;
    }
    return (
      <Radio
        onChange={handleChange}
        items={kycInfo}
        selectedValue={kycInfo?.[0]?.value}
        style={[styles.radio]}
      />
    );
  };

  const renderButtons = () => {
    return (
      <View>
        <Button
          label={translation.continue}
          // size="lg"
          style={{
            paddingTop: 15,
            paddingBottom: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            requestClose?.();
            onContinue?.(selectedItem.current);
          }}
        />
        <View height={12} />
        <SecondaryButton
          label={'Dùng giấy tờ tùy thân khác'}
          bold
          size="lg"
          // color={Colors.white}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            requestClose?.();
            onContinue?.();
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
      }}
    >
      <Image
        source={require('../images/bg-popup.png')}
        style={{
          height: 124,
          width: 400,
        }}
        resizeMode={'stretch'}
      />
      <View
        style={{
          padding: Spacing.PADDING,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            alignItems: 'center',
            marginTop: Spacing.PADDING,
          }}
        >
          {translation.connect_bank}
        </Text>
        <Text style={{}}>
          Thông tin giấy tờ tuỳ thân mà bạn chọn để liên kết phải trùng khớp với
          thông tin giấy tờ tuỳ thân được khai báo tại ngân hàng.{' '}
        </Text>
        {renderOptionIc()}
        {renderButtons()}
      </View>
    </View>
  );
};
export default PopUpBankLink;
const styles = StyleSheet.create({
  radio: {
    marginRight: 0,
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});
