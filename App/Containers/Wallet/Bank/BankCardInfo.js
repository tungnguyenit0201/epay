import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {base, Colors, Spacing} from 'themes';
import {Button,   DatePicker, Header, HeaderBg, InputBlock} from 'components';
import {useUserInfo} from 'context/User/utils';
import {useRoute} from '@react-navigation/native';
import {useUser} from 'context/User';
import {SCREEN} from 'configs/Constants';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';
import {mapBankNapas} from 'services/bank';
import moment from 'moment';
const INPUT_REF =  {
  CARD_NUMBER:'cardNumber',
  NAME:'name',
  DATE:'date',
};
const CARD_MAX_LENGTH = 19;
const BankCardInfo = (props) => {
  // TODO : translation
  const {params} = useRoute() || {};

  const {userInfo} = useUser();

  const {personalInfo, personalAddress, personalIC} = userInfo;
  const [cardNumber, setCardNumber] = useState();
  const [issueDate, setissueDate] = useState('');
  const [cardNumberErr, setCardNumberErr] = useState('');
  const [cardHolderName, setName] = useState(personalInfo?.FullName);
  const cardNumberRef = useRef();
  const issueDaterRef = useRef();
  useEffect(() => {
    return () => {
    };
  }, []);

  const formatBankCardNumber = (number, maxLength = 19) => {
    if (!number) {
      return '';
    }
    if (typeof number === 'string' || typeof number === 'string') {
      return number.toString().replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()
          .substring(0, maxLength);
    }
  };

  const checkInvalidCard = () => {
    const {BinNumbers} = params?.item || {};
    if (Array.isArray(BinNumbers) && BinNumbers.length > 0) {
      BinNumbers.forEach((element, index) => {
            const prefix = String(element)?.slice(element.length - 2, element.length);
            const regex = new RegExp(`^9704 ${prefix}([0-9]{2})(\\\\s[0-9]{4}){2}`);
            const isValid = regex.test(cardNumber.current);
            if (isValid ) {return null;}
          }
      );
      return BinNumbers?.[0];
    }
    return BinNumbers;
  };
  const onChangeCard = (number) => {
    const _number = formatBankCardNumber(number);
    setCardNumber(_number);

  };

  const onChangeDate = (date) => {
    const monthAndYear = moment(date,'DD-MM-YYYY').format('MM/YY');
    setissueDate(monthAndYear);
  };

  const onBlur = (input) => {
    switch (input) {
      case INPUT_REF.CARD_NUMBER: {
        //check validate
        const binInvalid = checkInvalidCard();
        if (binInvalid) {
          //validate card
          setCardNumberErr('Invalid card number, please start with ' + binInvalid);

        }
        break;
      }
      case INPUT_REF.NAME: {
        //check validate
        break;
      }
      case  INPUT_REF.DATE: {
        //check validate
        break;
      }
    }
  };
  const onSubmit = async () => {
    const {item:Bank, ICAddress, optionKyc, BankAccount} = params || {};
    const formatCardNumber = cardNumber?.replaceAll('/s','')?.replaceAll(' ','');
    const formatIssueDate = issueDate?.replace('/','');
    const BankConnectInfo = {
      'CardNumber': formatCardNumber,
      'CardHolder': cardHolderName,
      'BankId': 1,
      'CardIssueDate': formatIssueDate,
      'Amount': 10000,
    };
    try {
      const res = await mapBankNapas(BankConnectInfo);
      alert(res);
    } catch (e) {}

    props?.navigation?.push(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankLinkOTP,
    });
  };
  return (
      <ScrollView
          style={{backgroundColor: Colors.white}}
          contentContainerStyle={{flex: 1}}>
        <HeaderBg>
          <Header title="Thông tin cá nhân" back/>
        </HeaderBg>
        <View style={[base.container, {paddingTop: 20, flex: 1}]}>
          <View flex={1}>
            <View flex={1} style={{justifyContent: 'flex-start'}}>
              <InputBlock
                  value={cardNumber}
                  placeholder="Nhập số tài khoản/Số thẻ"
                  inputStyle={{marginTop: -40}}
                  onChange={onChangeCard}
                  error={cardNumberErr}
                  onBlur={()=>{onBlur(INPUT_REF.CARD_NUMBER);}}
                  onFocus={()=>setCardNumberErr('')}
                  maxLength={CARD_MAX_LENGTH}
              />
              <InputBlock
                  placeholder="Họ và Tên"
                  value={cardHolderName}
                  inputStyle={{marginTop: -40}}
                  onBlur={()=>{onBlur(INPUT_REF.NAME);}}

              />
              <DatePicker
                  onChange={value => onChangeDate( value)}
                  value={issueDate}
                  required
                  placeholder="mm/yy" />
            </View>
            <View style={{paddingBottom: Spacing.PADDING}}>
              <Button onPress={onSubmit} label="Lưu"/>
            </View>
          </View>
        </View>
      </ScrollView>
  );
};

export default BankCardInfo;

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
