import {Header, Icon} from 'components';
import {useTranslation} from 'context/Language';
import React from 'react';
import {View, Text} from 'react-native';
import _ from 'lodash';

const DetailHistory = ({route}) => {
  const translation = useTranslation();

  const {
    SrcAccount,
    DstAccount,
    TransCode,
    TransType,
    TransFormType,
    TransTime,
    Status,
    Description,
    TransFee,
    RequestedAmount,
    TransAmount,
    CommitedAmount,
    Payoneer,
  } = _.get(route, 'params.data', {});

  return (
    <View>
      <Header
        back
        title={translation.transaction_details}
        avoidStatusBar
        blackIcon
      />
      <Text>History</Text>
    </View>
  );
};

export default DetailHistory;
