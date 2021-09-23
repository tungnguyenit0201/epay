import {Header, Icon} from 'components';
import {useTranslation} from 'context/Language';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Row} from 'components';
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
      {/* icon thành công/ thất bại */}
      <Text>History</Text>
      <Text>Mã giao dịch: {TransCode}</Text>
      <Text>Thời gian: {TransTime}</Text>

      <Row space style={styles.row}>
        <Text>Tài khoản nguồn</Text>
        <Text>{SrcAccount}</Text>
      </Row>
      <Row space style={styles.row}>
        <Text>Số tiền</Text>
        <Text>{TransAmount}</Text>
      </Row>
      <Row space style={styles.row}>
        <Text>Số tiền</Text>
        <Text>{TransAmount}</Text>
      </Row>
    </View>
  );
};

export default DetailHistory;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
  },
});
