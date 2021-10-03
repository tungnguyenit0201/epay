import {useEffect, useState} from 'react';
import {TRANS_FORM_TYPE, TRANS_TYPE} from 'configs/Constants';
import _ from 'lodash';
import useBankInfo from './bankInfo';
import {useWallet} from '..';
import {useTopUpWithdraw} from './topUpWithdraw';
import {getBankFee} from 'services/wallet';
import {useUser} from 'context/User';
import BANK_LINKED_TYPE from 'configs/Enums/BankLinkedType';

const useWithDraw = () => {
    const {
        inputRef,
        isContinueEnabled,
        onChangeCash,
        onContinue,
        onSetBank,
        onSuggestMoney,
    } = useTopUpWithdraw({transType: TRANS_TYPE.CashOut});

    const {phone} = useUser();
    const {onGetConnectedBank} = useBankInfo();
    const {listConnectBank} = useWallet();
    const [bankFeeData, setBankFeeData] = useState({
        [TRANS_FORM_TYPE.CONNECTED_BANK]: null,
    });
    const bankLinkedList = listConnectBank?.filter(item=> item?.ConnectionType === BANK_LINKED_TYPE.CONNECTED);
    const bankData = {
        [TRANS_FORM_TYPE.CONNECTED_BANK]: bankLinkedList,
    };

    useEffect(() => {
        onGetConnectedBank();
    }, []); // eslint-disable-line

    useEffect(() => {
        _.forEach(bankData, (banks, transFormType) => {
            if (bankFeeData[transFormType]) {
                return;
            }
            banks.forEach(async (bank, index) => {
                const result = await getBankFee({
                    phone,
                    bankID: bank.BankId,
                    transType: TRANS_TYPE.CashIn,
                    transFormType,
                });
                setBankFeeData(bankFeeData => {
                    if (!bankFeeData[transFormType]) {
                        bankFeeData[transFormType] = [];
                    }
                    bankFeeData[transFormType][index] = _.get(result, 'FeeInfo', null);
                    return bankFeeData;
                });
            });
        });
    }, [bankData]); // eslint-disable-line

    const onSelectBank = data => {
        if (!data) {
            onSetBank(null);
            return;
        }
        const {index, type} = data || {};
        let bank = bankData?.[type]?.[index];
        let fee = bankFeeData?.[type]?.[index];
        if (!!bank && fee) {
            onSetBank({
                bank: bank,
                transFormType: type,
                fee: fee,
            });
        }
    };

    return {
        inputRef,
        isContinueEnabled,
        bankData,
        bankFeeData,
        onChangeCash,
        onSuggestMoney,
        onSelectBank,
        onContinue,
    };
};

export default useWithDraw;
