import React, { useState, useMemo } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Text,
  Header,
  Button,
  HeaderBg,
  InputBlock,
} from 'components';
import { base, Colors, Images, Spacing } from 'themes';
import { IC_TPYE, SCREEN } from 'configs/Constants';
import { useVerifyInfo } from 'context/User/utils';
import { useTranslation } from 'context/Language';
import Navigator from 'navigations/Navigator';

const ChooseIdentityCard = ({ route }) => {
  const translation = useTranslation();
  const cardList = [
    { label: translation?.id_card, ICType: IC_TPYE.CMND },
    { label: translation?.militaryID, ICType: IC_TPYE.CMNDQD },
    { label: translation?.passport, ICType: IC_TPYE.PASSPORT },
  ];
  const { verifyInfo, onChange, onContinue } = useVerifyInfo({
    identifyCard: cardList[0],
    KYCFlow: route?.params?.KYCFlow,
  });
  const [info, setInfo] = useState(verifyInfo.identifyCard);

  const label = useMemo(() => {
    return info
      ? info.label
      : cardList[0].label;
  }, [info, cardList]);

  return (
    <>
      <View style={styles.bgWhite}>
        <HeaderBg>
          <Header back title={translation?.verify_your_account} />
        </HeaderBg>
      </View>
      <View style={[base.container, styles.bgWhite, styles.flex1, styles.pt1]}>
        <Text fs="h6" bold mb={24}>
          {translation?.kycDescription}
        </Text>
        <InputBlock
          label={translation?.selectPersonalDocument}
          isSelect
          onPress={() => Navigator.showBottom({
            screen: DocumentTypeSelector,
            title: translation?.selectPersonalDocument,
            params: {
              data: cardList,
              selectedItem: info,
              onPress: item => {
                onChange('identifyCard', item);
                setInfo(item);
              },
            },
          })}
          rightIcon={Images.Down}
          value={label}
        />
      </View>
      <View style={base.bottom}>
        <Button
          label={translation?.continue}
          onPress={() => onContinue(SCREEN.VERIFY_USER_INFO)}
          bold
        />
      </View>
    </>
  );
};

const DocumentTypeSelector = (props = {}) => {
  const { data, onPress, requestClose, selectedItem = {} } = props;
  return (
    <ScrollView style={styles.selector}>
      {data?.map(item => {
        const selected = item.ICType === selectedItem.ICType;
        const selectedStyle = {
          backgroundColor: selected ? Colors.selected_gray : Colors.white,
        };
        return (
          <View key={`${Math.random(1, 100)}-dropdown`}>
            <TouchableOpacity
              style={selectedStyle}
              onPress={() => {
                onPress(item);
                requestClose?.();
              }}>
              <Text fs="md" style={styles.selectorText}>
                {item?.label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: Colors.white,
  },
  flex1: { flex: 1 },
  pt1: { paddingTop: 20 },
  selector: {
    minHeight: 200,
  },
  selectorText: {
    marginVertical: 10,
    marginHorizontal: Spacing.PADDING,
  },
});
export default ChooseIdentityCard;
