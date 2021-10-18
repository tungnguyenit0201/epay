import {Header, HeaderBg, Button, TextInput, Text} from 'components';
import {useTranslation} from 'context/Language';
import React from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import FooterContainer from 'components/Auth/FooterContainer';
import {base, Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import {useQRPromo} from 'context/Wallet/utils';

const Promotion = () => {
  const translation = useTranslation();
  const {width} = useWindowDimensions();
  const {promoCode, promotions, onGetPromo, onChange, onApplyPromo} =
    useQRPromo();
  const renderItem = (item, index) => {
    // TODO: translate
    return (
      <TouchableOpacity
        onPress={() => onChange('promoCode', item?.PromoCode)}
        key={`${Math.random(1, 100)}-promo`}
        style={[
          styles.wrapPromo,
          base.shadow,
          promoCode == item?.PromoCode && styles.active,
        ]}
      >
        <View style={[styles.row, styles.title]}>
          <Text fw="700" fs="h6">
            {item?.PromoCode}
          </Text>
          <Text fw="700" fs="h6">
            {item?.Title}
          </Text>
        </View>
        <View style={[styles.row, styles.content]}>
          <Text>{item?.Content}</Text>
          <Text color={Colors.brd1}>Điều kiện</Text>
        </View>
        <Text color={Colors.tp3}>HSD: {item?.ExpireDate}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header back title={translation.addPromoCode} />
      </HeaderBg>
      <View style={styles.wrapInput}>
        <TextInput
          isDeleted
          style={styles.input}
          placeholder={translation.fillPromoCode}
          onChange={value => onChange('promoCode', value)}
        />
        <Button
          label={translation.apply}
          ml={12}
          bgImg={0}
          bg={Colors.brd1}
          onPress={onGetPromo}
        />
      </View>
      <View style={styles.wrapPromoList}>
        {promotions?.map((item, index) => renderItem(item, index))}
      </View>
      <FooterContainer style={[styles.bottomBtn, {width: width}]}>
        <Button
          label={translation.use}
          disabled={!promoCode}
          onPress={onApplyPromo}
        />
      </FooterContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bs4,
  },
  wrapInput: {
    flexDirection: 'row',
    paddingHorizontal: scale(18),
    paddingTop: scale(24),
    justifyContent: 'space-between',
  },
  input: {
    width: scale(240),
  },
  btn: {
    marginLeft: scale(12),
  },
  wrapPromoList: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: scale(24),
  },
  wrapPromo: {
    backgroundColor: Colors.bs4,
    padding: scale(12),
    borderRadius: 8,
  },
  active: {
    backgroundColor: Colors.bg1,
  },
  bottomBtn: {
    position: 'absolute',
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    paddingBottom: scale(14),
  },
  content: {
    paddingBottom: scale(4),
  },
});
export default Promotion;
