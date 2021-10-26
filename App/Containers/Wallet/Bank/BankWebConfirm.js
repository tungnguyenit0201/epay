import React, {useEffect, useState} from 'react';
import {BackHandler, View, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import Navigator from 'navigations/Navigator';
import {useBankInfo} from 'context/Wallet/utils';

import {Header, HeaderBg} from 'components';
import {Colors} from 'themes';
import {useTranslation} from 'context/Language';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {APP_CONFIG, SCREEN} from 'configs/Constants';
import TRANS_STATUS from 'configs/Enums/TransStatus';
import {useUser} from 'context/User';

const transaction_response = {
  OrderId: 'CE_1633615226236',
  OrderAmount: '20000',
  OrderReference: 'CASHINCE_1633615226236',
  DataKey:
    'HRqWWEGt8tWaCF5SQj327KU9Mq95mez+1b0cD62tIZHnym2gPaAI4PZfXZgaFkf4dWJlBSWj7NJVvXkdxFz4TN4MxcgY3omcen8OWl82vvQMe5YY6Hb4rVvW9VaDpbSj86wNJ9UxyR6M9l7C5tHTWJDxtAyNv35fflw6oQuxaWGrYJaamW0xODC8tsAe/4+bexIMT8IFqUtF0xNu6OWVSpBoUo/uT5Ck/UHGTyCBAxoQZsMW/uSlJBfvSu86NNCTuKIRvCH9BmdAyLFEJPKszjwDie9EXiowXcnysDZWwISlk/pOTpwkUIf9C47xv/+qWZ2AfvyoiAmrlFPMEdvw67izbuV6wXUazl7eL9EQL+4hhJtfVsKTR3A7RfnL9xBBtBijhQ8Ae6zW/kYlNlYhcu1LRGdMpdLyT15uMuqwv6a/+BXW2BHuklwSnqxwoTGTuZEbKWK30IxVp1pv4csgGO8Nr40HyPsv3wx+aqJduf4tLG6MePMfAYTpcb+Hx0SZ',
  NapasKey:
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbP6iFl0Z9pDHv5ni/fhl4ME6AfP16E5zmrHYftaBlcvq1bWRwk1TH23OrYQ6n6jEGIbmrVXzIM00lk723/ZHtvbyZld8r5TcEh5M+h/jIu3/J9gqNYGTo9jLJ0DvRdSfzbDWJqPImPfcGJDRPTrEtckqmd8HvkU6J3MCPrg0IOGTYplUmw6DZ25g1SpBSb1CAWGqP36nqyxNZ4hNJ08agHQbRc/ICHUb/8+/UjDETX96SYVn+GBKbrMM/NcgiJV7UXbEmQ9OEiM3BbI5srhCOt0oYoCp0sJcpLcLbRlpdC7/nV44KPty1rkZ32KlBufz3UVggXpHPz0k0yxYTvl/wIDAQAB:MIICtTCCAZ0CBgFoko89+DANBgkqhkiG9w0BAQUFADAeMRwwGgYDVQQDExNUZXN0IENBIENlcnRpZmljYXRlMB4XDTE5MDEyODAzNDQ0N1oXDTE5MDEyOTAzNDQ0N1owHjEcMBoGA1UEAxMTVGVzdCBDQSBDZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK2z+ohZdGfaQx7+Z4v34ZeDBOgHz9ehOc5qx2H7WgZXL6tW1kcJNUx9tzq2EOp+oxBiG5q1V8yDNNJZO9t/2R7b28mZXfK+U3BIeTPof4yLt/yfYKjWBk6PYyydA70XUn82w1iajyJj33BiQ0T06xLXJKpnfB75FOidzAj64NCDhk2KZVJsOg2duYNUqQUm9QgFhqj9+p6ssTWeITSdPGoB0G0XPyAh1G//Pv1IwxE1/ekmFZ/hgSm6zDPzXIIiVe1F2xJkPThIjNwWyObK4QjrdKGKAqdLCXKS3C20ZaXQu/51eOCj7cta5Gd9ipQbn891FYIF6Rz89JNMsWE75f8CAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAFXK48p71S87EmrnCm5Yvv42Oxzh0B18/q4jn891xS1abFRkW2jdCvpc3IUQL6gy+JFQcY2NSaLhIYgBafmcngiBFt4kkTqUuwSdIWudl3jYkO58SOYKdxW8jbXM5KwTujpb0gYBpf1u5828RmEq6YEog/yx/hYQOFQlfIBBZFNmUJ7U5TDCFL2wT5MqPg2cfb1DirveD3sLSIUc90IJM3eUXfzXqkwdrCKDZRSuV3TMHChi1IRio2fg7zesi9HliFueaekkvynnwXoG41LKaMSBMM/Mdrb2tm29jVYnlYJ8Coj+dOjWhU2y83dFi5DGr8a3ftWOc+rEz2zlOUKRF7Q==',
  TransCode: 'NT202110072100260005',
  ApiOperation: 'PURCHASE_OTP',
  MsgID: '47A42A2C-B95A-4926-9B7B-1A7908BA092707-10-2021 21:00:26.206',
  MsgType: 'cash_in_napas_response',
  TransactionID: '16336152262063553',
};
const MOCK_BANK_INFO = {
  transCode: transaction_response.TransCode,
  bankId: '',
  bankCode: '',
  cardNumber: '',
  orderId: transaction_response.OrderId,
  orderAmount: transaction_response.OrderAmount,
  orderReference: transaction_response.OrderReference,
  apiOperation: transaction_response.ApiOperation,
  dataKey: transaction_response.DataKey,
  napasKey: transaction_response.NapasKey,
};
const BankWebConfirm = props => {
  const translation = useTranslation();
  const {params} = useRoute() || {};
  const [simulationForm, setSimulationForm] = useState(false);
  const {url, onBackOtp, onDoneOtp, isSaveToken, item: Bank} = params;
  const [shouldCancel, setShouldCancel] = useState(true);
  const {onCheckNapasTransStatus} = useBankInfo();
  const {napasInfo = MOCK_BANK_INFO, title} = params || {};
  const {phone} = useUser();
  let deviceId = '5FADEDCB-05CB-4A37-BE7B-87F7C8299003';
  let ipAddress = '27.65.248.217';

  const {
    transCode,
    bankId,
    bankCode,
    cardNumber,
    orderId,
    orderAmount,
    orderReference,
    apiOperation,
    dataKey,
    napasKey,
  } = {
    apiOperation: 'PURCHASE_WITH_RETURNED_TOKEN',
    bankCode: 'BIDVVNVX',
    bankId: 10,
    cardNumber: '970400***********018',
    dataKey:
      'HRqWWEGt8tWaCF5SQj327KU9Mq95mez+1b0cD62tIZHnym2gPaAI4PZfXZgaFkf4EVlS56f5JECZJiyzXW+WKqRx50krx3caHrGHK2fzqj4vSTJ4z9Hr0INkWkPVxHrjFEp7qn74jnfOlQ4Z9LD25c6tBuyvvj1mjD/RmEiZS44p9u3a1z7aH1imv6P/qsidkixrGNYJebdsKWnFVzC3Z/S67oBPgW7JJbtoNKE/q8OYv/AFu8+EGc8UyxbDkctTqU2QD5EhEHWM4dy4SPnQ6vTq/YwzK3CkDF5Ue1YVzdsI5mXSZaWAPy9l4VAI7cGkiKn++2JtD344E96U80UeYc9Lr/+GmqxE2OGUXGkVJ6hHitlT4jocbJKpDXz2tf0eVdcm/Nit9zFOwbnJsHCP4OhUKUnBqdiF6E8uWdkeOom3jO7SQnIEoeiLZyhDL+Gc8aCK7uU4ArR5nunz/1Sro/ypWDmA14JqDWwq0mG7V6lY23CnJ4U0naHL2WGvdHIy',
    napasKey:
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbP6iFl0Z9pDHv5ni/fhl4ME6AfP16E5zmrHYftaBlcvq1bWRwk1TH23OrYQ6n6jEGIbmrVXzIM00lk723/ZHtvbyZld8r5TcEh5M+h/jIu3/J9gqNYGTo9jLJ0DvRdSfzbDWJqPImPfcGJDRPTrEtckqmd8HvkU6J3MCPrg0IOGTYplUmw6DZ25g1SpBSb1CAWGqP36nqyxNZ4hNJ08agHQbRc/ICHUb/8+/UjDETX96SYVn+GBKbrMM/NcgiJV7UXbEmQ9OEiM3BbI5srhCOt0oYoCp0sJcpLcLbRlpdC7/nV44KPty1rkZ32KlBufz3UVggXpHPz0k0yxYTvl/wIDAQAB:MIICtTCCAZ0CBgFoko89+DANBgkqhkiG9w0BAQUFADAeMRwwGgYDVQQDExNUZXN0IENBIENlcnRpZmljYXRlMB4XDTE5MDEyODAzNDQ0N1oXDTE5MDEyOTAzNDQ0N1owHjEcMBoGA1UEAxMTVGVzdCBDQSBDZXJ0aWZpY2F0ZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAK2z+ohZdGfaQx7+Z4v34ZeDBOgHz9ehOc5qx2H7WgZXL6tW1kcJNUx9tzq2EOp+oxBiG5q1V8yDNNJZO9t/2R7b28mZXfK+U3BIeTPof4yLt/yfYKjWBk6PYyydA70XUn82w1iajyJj33BiQ0T06xLXJKpnfB75FOidzAj64NCDhk2KZVJsOg2duYNUqQUm9QgFhqj9+p6ssTWeITSdPGoB0G0XPyAh1G//Pv1IwxE1/ekmFZ/hgSm6zDPzXIIiVe1F2xJkPThIjNwWyObK4QjrdKGKAqdLCXKS3C20ZaXQu/51eOCj7cta5Gd9ipQbn891FYIF6Rz89JNMsWE75f8CAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAFXK48p71S87EmrnCm5Yvv42Oxzh0B18/q4jn891xS1abFRkW2jdCvpc3IUQL6gy+JFQcY2NSaLhIYgBafmcngiBFt4kkTqUuwSdIWudl3jYkO58SOYKdxW8jbXM5KwTujpb0gYBpf1u5828RmEq6YEog/yx/hYQOFQlfIBBZFNmUJ7U5TDCFL2wT5MqPg2cfb1DirveD3sLSIUc90IJM3eUXfzXqkwdrCKDZRSuV3TMHChi1IRio2fg7zesi9HliFueaekkvynnwXoG41LKaMSBMM/Mdrb2tm29jVYnlYJ8Coj+dOjWhU2y83dFi5DGr8a3ftWOc+rEz2zlOUKRF7Q==',
    orderAmount: '200000',
    orderId: 'CE_1633632741932',
    orderReference: 'CASHINCE_1633632741932',
    transCode: 'NT202110080152210034',
  };
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (shouldCancel) {
          back();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      setTimeout(() => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
      }, 200);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigator]),
  );

  useEffect(() => {
    navigator?.setOptions?.({onPressLeftHeader: back});
  }, [navigator]);

  useEffect(() => {
    // let deviceId = await getUniqueDeviceID()
    // let deviceId = 'CC2304FD-3149-4F4A-BD05-3C9A900D075C'
    // let ipAddress = AppInfo.ipAddress
    // let ipAddress = '222.252.17.214'
    // EventBus.getInstance().addListener(EventBusType.napas_result, this.notify_listener = async (data) => {
    //     console.log('NapasScreen notification received: ' + JSON.stringify(data));
    //     this.refs.processModal.hide();
    //     await api.common.log('Napas data: ' + JSON.stringify(data));
    //
    //     if (data != null && data != undefined && data.data != null && data.data != undefined) {
    //         await api.common.log('Execute napas data: ' + JSON.stringify(data.data));
    //         this.executePushResult(data.data);
    //     } else {
    //         console.log('Notification data null');
    //         this.startCountingDownToCheckTrans();
    //     }
    // });
    //
    // EventBus.getInstance().addListener(EventBusType.napas_escape, this.napas_listener = () => {
    //     console.log('Received napas escape');
    //     this.setState({
    //         holdOnTransactionMonitor: true,
    //     });
    //
    //     this.checkTransNapas(false);
    // });
    //
    // EventBus.getInstance().addListener(EventBusType.napas_switch_form_for_simul, this.napas_switch_listener = () => {
    //     console.log('Received napas switch form');
    //     this.setState({ simulationForm: !this.state.simulationForm });
    // });
    //
    // this.initTransactionTimeoutMonitor();
    //
    // // For testing
    // if (AppConstants.isDevChannel) {
    //     // setTimeout(() => {
    //     //     this.executePushResult({ErrorCode: ERROR_CODE.SUCCESS, TransState: TRANS_STATE.NAPAS_PENDING, TransErrorCode: ERROR_CODE.NAPAS_PENDING, TransErrorMessage: "Blahbbababababa"})
    //     // }, 5000)
    // }
  }, []);

  const back = () => {
    // Navigator.showAlert({
    //   title: 'Huỷ giao dịch',
    //   message: 'Bạn có chắc chắn muốn huỷ giao dịch này?',
    //   positiveButton: {
    //     title: 'TIẾP TỤC',
    //     onPress: () => {
    //       return;
    //     },
    //   },
    //   negativeButton: {
    //     title: 'HỦY NGAY',
    //     onPress: () => {
    //       _cancelTransaction();
    //       onBackOtp?.();
    //     },
    //   },
    // });
  };

  const _cancelTransaction = () => {
    if (shouldCancel) {
      props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
        screen: MapBankRoutes.BaseResultScreen,
        params: {
          transState: TRANS_STATUS.FAILURE,
          ...params,
        },
      });
    }
  };

  const onMessage = (event = {}) => {
    //change data due to epay link
    const {data = ''} = event.nativeEvent || {};
    const transaction = JSON.parse(data) || {};
    const {tranId} = transaction;
    if (tranId) {
      setShouldCancel(false);
      doneOtp(transaction);
    }
  };

  const doneOtp = async transaction => {
    if (transaction) {
      onDoneOtp?.(transaction);
      let {error} = transaction;
      if (error === 0) {
        const result = await onCheckNapasTransStatus({transCode});
        props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
          screen: MapBankRoutes.BaseResultScreen,
          params: {
            transState: result?.tranStatus,
            ...params,
          },
        });
      } else {
        _cancelTransaction();
      }
    }
  };

  const htmlDev = {
    html: `
            <form id="merchant-form" 
                action="${APP_CONFIG.baseURL}/bank/napas_result?phoneNumber=${phone}&orderId=${orderId}"
                method="POST"></form>
                <div id="napas-widget-container"></div>
                <script type="text/javascript" 
                    id="napas-widget-script"
                    src="https://dps-staging.napas.com.vn/api/restjs/resources/js/napas.hostedform.min.js"
                    merchantId="EPAYCE"
                    clientIP="${ipAddress}" 
                    deviceId="${deviceId}" 
                    environment="MobileApp" 
                    cardScheme="AtmCard" 
                    enable3DSecure="false"
                    orderId="${orderId}" 
                    apiOperation="${apiOperation}"
                    orderAmount="${orderAmount}" 
                    orderCurrency="VND"
                    orderReference="${orderReference}"
                    channel="6014"
                    sourceOfFundsType="CARD"
                    submerchantCode="EPAY"
                    submerchantName="EPAY JSC."
                    submerchantReferenceId="EPAY"
                    languague="vi"
                    dataKey="${dataKey}"
                    napasKey="${napasKey}">
                </script>
            </form>
        `,
    baseUrl: 'http://localhost',
  };

  const htmlSimul = {
    html: `<html>

            <head>
                <title>Napas simulator result</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
                <script src="https://portal.epayservices.com.vn:8443/js/common.js"></script>
            
                <script type="text/javascript">
                    const prepareData = () => {
                        const napasError = {
                            cause: $('#txt-errorCode').val(),
                            explanation: $('#txt-errorDesc').val(),
                            validationType: $('#txt-errorDesc').val()
                        }
                        const resultInfo = {
                            paymentResult: {
                                result: $('#txt-errorType').val(),
                                error: napasError,
                                response: {
                                    gatewayCode: $('#txt-errorCode').val()
                                }
                            },
                            tokenResult: {
                                result: $('#txt-errorType').val(),
                                error: napasError
                            }
                        }
            
                        const newData = btoa(JSON.stringify(resultInfo));                                   
                        const encryptMessage = {
                            data: newData,
                            checksum: sha256(newData + '5F5D3AEE7B42863F97031B31A0D53A6E')
                        }    
                        $('#hd-result').val(JSON.stringify(encryptMessage))
                        console.log($('#hd-result').val())
                        return true;
                    }
            
                </script>
            
            </head>
            
            <body>
                <form id="merchant-form" action="${APP_CONFIG.baseURL}/bank/napas_result?phoneNumber=${phone}&orderId=${orderId}"
                    method="POST">
                    <input type="hidden" id="hd-result" name="napasResult" />
                    <table>
                        <tr>
                            <td>Error Type</td>
                            <td><input type="text" id="txt-errorType" value="PENDING"/></td>
                        </tr>
                        <tr>
                            <td>Error Code</td>
                            <td><input type="text" id="txt-errorCode" value=""/></td>
                        </tr>
                        <tr>
                            <td>Error desc</td>
                            <td><input type="text" id="txt-errorDesc" /></td>
                        </tr>
                    </table>
                    <button type="submit" onclick="prepareData();">Submit</button>
                </form>
            </body>
            
            </html>`,
    baseUrl: 'http://localhost',
  };
  console.log(
    `${APP_CONFIG.baseURL}/bank/napas_result?phoneNumber=${phone}&orderId=${orderId}`,
  );
  return (
    <View flex={1} backgroundColor={Colors.bs4}>
      <HeaderBg>
        <Header
          back
          title={title || translation.connect_bank}
          // onPressBack={back}
        />
      </HeaderBg>
      <WebView
        onMessage={onMessage}
        source={simulationForm ? htmlSimul : htmlDev}
        useWebKit
        originWhitelist={['*']}
        renderLoading={() => (
          <ActivityIndicator
            color={Colors.primary}
            size="large"
            style={{flex: 1, justifyContent: 'center'}}
          />
        )}
        startInLoadingState
        thirdPartyCookiesEnabled
        domStorageEnabled
        databaseEnabled={true}
        javaScriptEnabled={true}
        scalesPageToFit
        mixedContentMode={'never'} // security
        // ref={webViewRef}
        onNavigationStateChange={newNavState => {
          console.log(newNavState);
          if (!newNavState.loading) {
            console.log('Web loading completed');
          }
        }}
      />
    </View>
  );
};

export default React.memo(BankWebConfirm);
