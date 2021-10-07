import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import {
  Text,
  Header,
  Button,
  Row,
  Col,
  ListItem,
  HeaderBg,
  Separator,
} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {formatMoney, scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import ModalBottom from 'components/Common/ModalBottom';
import Bank from 'components/QRPay/Bank';
import SelectBank from 'components/QRPay/SelectBank';
import {useWallet} from 'context/Wallet';
import {useQRTransfer} from 'context/Wallet/utils';
import DashedLine from 'react-native-dashed-line';

const TransactionResult = () => {
  // TODO: translate
  const {qrTransaction, sourceMoney} = useWallet();
  const {bankFee} = useQRTransfer();
  console.log('qrTransaction :>> ', qrTransaction);

  const translation = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const {width} = useWindowDimensions();
  const data = [
    {
      label: 'Chuyển đến ',
      value: 'NGUYEN VAN B ',
    },
    {
      label: 'Số điện thoại ',
      value: '0909000999 ',
    },
    {
      label: 'Nội dung ',
      value: 'FROM AN ',
    },
    {
      label: 'Phí giao dịch',
      value: 'Miễn phí',
    },
    {
      label: 'Người chịu phí ',
      value: 'Người gửi ',
    },
    {
      label: 'Thực chuyển ',
      value: '1.000.000 vnd',
    },
    {
      label: 'Tổng số tiền',
      value: <Text bold>1.005.000 vnđ</Text>,
    },
  ];
  const paymentData = [
    {
      label: 'Nhà cung cấp ',
      value: qrTransaction?.MerchantName,
    },
    {
      label: 'Đại lý ',
      value: qrTransaction?.AgencyName,
    },
    {
      label: 'Nội dung ',
      value: qrTransaction?.Content,
    },
  ];
  const feeData = [
    {
      label: 'Số tiền ',
      value: `${formatMoney(qrTransaction?.Price)}đ`,
    },
    {
      label: 'Phí giao dịch ',
      value: qrTransaction?.TransFee
        ? `${formatMoney(qrTransaction?.TransFee)}đ`
        : 'Miễn phí',
    },
  ];

  const renderItem = (item, index) => {
    return (
      <View key={Math.random(1, 100)}>
        <View style={[styles.row]}>
          <Text style={styles.textLeft}>{item.label}</Text>

          <Text style={styles.textRight}>{item.value}</Text>
        </View>
        <DashedLine dashLength={4} dashThickness={1} dashColor={Colors.l3} />
      </View>
    );
  };
  return (
    <>
      <HeaderBg>
        <Header title="Xác nhận chuyển tiền" back />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          <SelectBank
            onPress={() => setShowModal(!showModal)}
            bankInfo={{
              BankNumber: sourceMoney[0].SourceAccount,
              BankName: sourceMoney[0].SourceName,
            }}
          />
          <View style={styles.block}>
            <Image
              source={require('images/bgXacNhan.png')}
              style={styles.bgImg}
            />
            <Text fw="700" fs="lg">
              Chi tiết giao dịch
            </Text>
            {!qrTransaction?.OrderID &&
              data.map((item, index) => renderItem(item, index))}
            {!!qrTransaction?.OrderID && (
              <>
                {paymentData?.map((item, index) => renderItem(item, index))}
                <View style={[styles.sepa, {width: width}]}>
                  <Separator height={12} />
                </View>
                {feeData?.map((item, index) => renderItem(item, index))}
                <View>
                  <View style={[styles.row]}>
                    <Text style={styles.textLeft}>Khuyến mãi</Text>

                    <Text style={styles.textRight}>-</Text>
                  </View>
                  <View style={[styles.row, {paddingTop: 0}]}>
                    <Button
                      label={translation?.addPromoCode}
                      size="sm"
                      bgImg={false}
                      bg={Colors.white}
                      border={Colors.cl4}
                      color={Colors.black}
                      style={{width: scale(144)}}
                      // mb={Spacing.PADDING}
                    />
                    <Text style={styles.textRight}>-</Text>
                  </View>

                  <DashedLine
                    dashLength={4}
                    dashThickness={1}
                    dashColor={Colors.l3}
                  />
                </View>
              </>
            )}
          </View>
        </View>
        <View style={{height: 50}}></View>
      </ScrollView>
      <View style={[base.boxBottom]}>
        <Button
          onPress={() => {
            Navigator.navigate(SCREEN.TRANSFER_SUCCESS);
          }}
          type={1}
          label="Chuyển tiền"
          bold
        />
      </View>

      <ModalBottom visible={showModal} onClose={() => setShowModal(false)}>
        <Bank sourceMoney={sourceMoney} />
      </ModalBottom>
    </>
  );
};
const styles = StyleSheet.create({
  block: {
    marginVertical: Spacing.PADDING * 2,
    position: 'relative',
    minHeight: 128,
  },

  bgImg: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{translateX: scale(-64)}, {translateY: 0}],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.PADDING,
  },

  textLeft: {
    color: Colors.cl3,
  },
  textRight: {
    color: Colors.BLACKTEXT,
    // maxWidth: scale(160),
  },
  sepa: {marginLeft: -Spacing.PADDING, marginTop: -1},
});
export default TransactionResult;
