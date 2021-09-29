import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { base } from 'themes';
import { IC_TPYE } from 'configs/Constants';
import { useVerifyInfo } from 'context/User/utils';
import DropImage from 'components/User/VerifyInfo/DropImage';
import { useTranslation } from 'context/Language';
import _ from 'lodash';
import BaseVerifyInfo from './BaseVerifyInfo';

const VerifyUserInfo = ({ route }) => {
  const { onDoneIdentityCard, onChange, verifyInfo } = useVerifyInfo(
    route?.params,
  );
  const translation = useTranslation();
  const identityCard = _.get(route, 'params.identifyCard.ICType', IC_TPYE.CMND);
  const documentType = verifyInfo?.identifyCard?.ICType;

  return (
    <BaseVerifyInfo
      step={1}
      disableButton={!verifyInfo?.ICFrontPhoto || !verifyInfo?.ICBackPhoto}
      buttonTitle={translation?.continue}
      onPressButton={onDoneIdentityCard}
    >
      <View style={[base.container, styles.pt1]}>
        <DropImage
          title={translation?.photo_of_the_front_side}
          onDropImage={value => {
            onChange('ICFrontPhoto', value);
            identityCard === IC_TPYE.PASSPORT &&
              onChange('ICBackPhoto', value?.data);
          }}
          identify={identityCard}
          draft={verifyInfo?.ICFrontPhoto}
          documentType={documentType}
          verifyParams={route?.params}
        />
        {identityCard !== IC_TPYE.PASSPORT && (
          <DropImage
            title={translation?.photo_of_the_back_side}
            onDropImage={value => {
              onChange('ICBackPhoto', value);
            }}
            draft={verifyInfo?.ICBackPhoto}
            style={styles.mb1}
            type={'back'}
            documentType={documentType}
            verifyParams={route?.params}
          />
        )}
      </View>
    </BaseVerifyInfo>
  );
};

const styles = StyleSheet.create({
  pt1: { paddingTop: 48 },
  mb1: { marginBottom: 32 },
});

export default VerifyUserInfo;
