import React from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Header, Button, HeaderBg, Text} from 'components';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import {scale} from 'utils/Functions';
import {useTransactionResult} from 'context/Wallet/utils';
import {useTranslation} from 'context/Language';
import DashedLine from 'react-native-dashed-line';
import LinearGradient from 'react-native-linear-gradient';
import {style} from 'dom-helpers';

const TransactionResult = () => {
  const {
    data,
    transactionSuccess,
    onRetry,
    onBackHome,
    formatAmount,
    statusTitle,
    description,
    TransState,
  } = useTransactionResult();
  const translation = useTranslation();
  const renderItem = (item, index) => {
    return (
      <View>
        <View style={[styles.content]} key={item.label + item.value}>
          <Text style={styles.detailTextDescription}>{item.label}</Text>
          <Text style={styles.detailTextContent}>{item.value}</Text>
        </View>
        {index < data.length - 1 && (
          <DashedLine dashLength={4} dashThickness={1} dashColor={Colors.l3} />
        )}
      </View>
    );
  };
  return (
    <>
      <HeaderBg>
        <Header
          title={translation.transaction.transactionDetail}
          back
          onPressBack={onRetry}
        />
      </HeaderBg>
      <ScrollView style={styles.container}>
        <View style={styles.mt_30}>
          <View style={styles.contentAbove}>
            <Image
              style={styles.icon}
              source={
                transactionSuccess
                  ? Images.Transaction.Success
                  : Images.Transaction.Failure
              }
            />
            <Text style={styles.statusTitle}>{statusTitle}</Text>
            <Text style={styles.formatAmount}>{formatAmount}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.flexBox}>
            <View style={styles.wrap}>
              {data.map((item, index) => renderItem(item, index))}
            </View>

            <Image
              source={Images.Transaction.BGIcon}
              style={styles.centerIcon}
            />
          </View>

          {!transactionSuccess && (
            <Pressable style={styles.supportButton}>
              <LinearGradient
                start={{x: 0, y: 0.75}}
                end={{x: 1, y: 0.25}}
                colors={[Colors.barLeft, Colors.barRight]}
                style={styles.supportLinear}
              >
                <View style={styles.row}>
                  <Image
                    style={styles.supportIcon}
                    resizeMode
                    source={Images.Transaction.Call}
                  />
                  <Text style={styles.supportDescription}>
                    {translation.transaction.support}
                  </Text>
                </View>
                <Text style={styles.supportPhone}>
                  {translation.transaction.supportPhone}
                </Text>
              </LinearGradient>
            </Pressable>
          )}
        </View>
      </ScrollView>
      <View style={[base.boxBottom, styles.bottomButtonContainer]}>
        <Button
          bgImg={0}
          color={Colors.blue}
          label={translation.common.goBackHome}
          style={styles.goBackHomeButton}
          // fs={Fonts.FONT_MEDIUM}
          onPress={onBackHome}
        />
        <Button
          label={translation.common.createTransaction}
          style={styles.retryButton}
          // fs={Fonts.FONT_MEDIUM}
          onPress={onRetry}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING,
  },
  row: {
    flexDirection: 'row',
  },
  blackColor: {
    backgroundColor: Colors.g9,
  },
  textWhite: {
    color: Colors.white,
  },
  contentAbove: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: Fonts.H5,
    marginTop: scale(14),
    color: Colors.l7,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
    lineHeight: 30,
  },
  formatAmount: {
    color: Colors.blue,
    fontSize: Fonts.H3,
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 40,
  },

  description: {
    color: Colors.l8,
    fontSize: scale(14),
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 30,
  },
  icon: {
    width: scale(60),
    height: scale(60),
    marginTop: scale(22),
  },

  supportLinear: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingHorizontal: Spacing.PADDING,
  },
  supportIcon: {
    width: scale(16),
    height: scale(16),
    marginRight: 12,
  },
  supportDescription: {
    color: Colors.white,
    fontSize: scale(14),
    textAlign: 'center',
    fontWeight: '700',
  },
  supportPhone: {
    color: Colors.white,
    fontSize: scale(14),
    textAlign: 'center',
    fontWeight: '700',
  },
  retryButton: {
    flex: 1,
    marginLeft: 5,
  },
  goBackHomeButton: {
    flex: 1,
    marginRight: 5,
    borderColor: Colors.blue,
    borderWidth: 2,
    backgroundColor: Colors.white,
  },
  mt_30: {
    marginBottom: scale(30),
  },
  flexBox: {
    flex: 3,
    marginTop: scale(25),
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scale(50),
  },
  detailTextDescription: {
    fontSize: scale(16),
    fontWeight: '400',
    lineHeight: 25,
    color: Colors.l8,
  },
  detailTextContent: {
    fontSize: scale(16),
    fontWeight: '700',
    lineHeight: 25,
    color: Colors.l7,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    paddingVertical: scale(10),
    paddingHorizontal: Spacing.PADDING,
  },
  centerIcon: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-64)}, {translateY: scale(-64)}],
  },
  supportButton: {
    flex: 1,
    height: scale(40),
    paddingHorizontal: Spacing.PADDING,
  },
});
export default TransactionResult;
