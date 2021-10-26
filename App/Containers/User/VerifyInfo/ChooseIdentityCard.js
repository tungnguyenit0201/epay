import React, {useState, useMemo} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import {Text, Header, Button, HeaderBg, InputBlock} from 'components';
import {base, Colors, Images, Spacing} from 'themes';
import {IC_TPYE, SCREEN} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';

const ChooseIdentityCard = ({route}) => {
  const translation = useTranslation();
  const {width} = useWindowDimensions();
  const cardList = [
    {label: translation?.id_card, ICType: IC_TPYE.CMND},
    {label: translation?.militaryID, ICType: IC_TPYE.CMNDQD},
    {label: translation?.passport, ICType: IC_TPYE.PASSPORT},
  ];
  const {verifyInfo, onChange, onContinue} = useVerifyInfo({
    identifyCard: cardList[0],
    KYCFlow: route?.params?.KYCFlow,
  });
  const [info, setInfo] = useState(verifyInfo.identifyCard);

  const label = useMemo(() => {
    return info ? info.label : cardList[0].label;
  }, [info, cardList]);

  const backgroundStyle = {
    width,
    height: width,
  };

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
          onPress={() =>
            Navigator.showBottom({
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
            })
          }
          rightIcon={Images.Down}
          value={label}
        />
      </View>
      <Image
        style={[styles.background, backgroundStyle]}
        source={Images.VerifyUserInfo.wave}
        resizeMode="contain"
      />
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Button
            label={translation?.continue}
            onPress={() => onContinue(SCREEN.VERIFY_USER_INFO)}
          />
        </View>
      </View>
    </>
  );
};

const DocumentTypeSelector = (props = {}) => {
  const {data, onPress, requestClose, selectedItem = {}} = props;
  return (
    <ScrollView style={styles.selector}>
      {data?.map(item => {
        const selected = item.ICType === selectedItem.ICType;
        const selectedStyle = {
          backgroundColor: selected ? Colors.bs2 : Colors.bs4,
        };
        const color = selected ? Colors.tp2 : Colors.tp3;
        return (
          <View key={`${Math.random(1, 100)}-dropdown`}>
            <TouchableOpacity
              style={selectedStyle}
              onPress={() => {
                onPress(item);
                requestClose?.();
              }}
            >
              <Text fs="md" style={styles.selectorText} color={color}>
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
    backgroundColor: Colors.bs4,
  },
  flex1: {flex: 1},
  pt1: {paddingTop: 20},
  selector: {
    minHeight: 150,
  },
  selectorText: {
    marginVertical: 10,
    marginHorizontal: Spacing.PADDING,
  },
  background: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING,
    paddingBottom: Spacing.PADDING * 2,
    backgroundColor: Colors.bs4,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    shadowColor: Colors.tp2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
  bottomContainer: {
    backgroundColor: Colors.bs4,
  },
});
export default ChooseIdentityCard;
