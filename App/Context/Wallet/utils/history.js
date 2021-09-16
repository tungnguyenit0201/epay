import {COMMON_ENUM, ERROR_CODE, SCREEN, TRANS_TYPE} from 'configs/Constants';
import {useError} from 'context/Common/utils';
import {useUser} from 'context/User';
import Navigator from 'navigations/Navigator';
import {useEffect, useState, useRef, useCallback} from 'react';
import {getHistory} from 'services/wallet';
import _ from 'lodash';
import moment from 'moment';

const incomeType = [TRANS_TYPE.CashIn, TRANS_TYPE.CashReceive];
const expenseType = [
  TRANS_TYPE.CashOut,
  TRANS_TYPE.CashTransfer,
  TRANS_TYPE.AutoCashIn,
  TRANS_TYPE.PaymentToll,
  TRANS_TYPE.PaymentMerchant,
];

const useHistory = () => {
  const {phone} = useUser();
  const [historyData, setHistoryData] = useState([]);
  const {setError} = useError();
  const contentRef = useRef({
    search: '',
    startDate: moment()
      .subtract(1, 'years')
      .format(COMMON_ENUM.DATETIME_FORMAT),
    endDate: moment().format(COMMON_ENUM.DATETIME_FORMAT),
    serviceID: 0,
    stateID: 0,
  });

  const parseHistory = data => {
    // parser for grouping
    const parser = item => {
      const time = moment(item?.TransTime, COMMON_ENUM.DATETIME_FORMAT);
      return `${time.month()}/${time.year()}`;
    };
    // group into object -> to array -> map into structured objects {key, list, income, expense}
    // list is list from backend + field isIncome
    // income, expense are the list filtered by transtype (income or expense) then calculate the total
    const parsedData = Object.entries(_.groupBy(data, parser)).map(item => {
      return {
        key: item[0],
        list: item[1].map(transaction => ({
          ...transaction,
          isIncome: incomeType.includes(transaction?.TransType),
        })),
        income: item[1]
          .filter(transaction => incomeType.includes(transaction?.TransType))
          .reduce(
            (total, transaction) => parseInt(transaction?.TransAmount) + total,
            0,
          ),
        expense: item[1]
          .filter(transaction => expenseType.includes(transaction?.TransType))
          .reduce(
            (total, transaction) => parseInt(transaction?.TransAmount) + total,
            0,
          ),
      };
    });
    // sort the array by month, latest months first
    parsedData.sort((x, y) => {
      const timeX = x.key.split('/');
      const timeY = y.key.split('/');
      if (parseInt(timeX[1]) === parseInt(timeY[1])) {
        return parseInt(timeY[0]) - parseInt(timeX[0]);
      }
      return parseInt(timeY[1]) - parseInt(timeX[1]);
    });
    setHistoryData(parsedData);
  };

  const onGetHistory = async () => {
    const {search, startDate, endDate, serviceID, stateID} = contentRef.current;
    const result = await getHistory({
      phone,
      StartDate: startDate,
      EndDate: endDate,
      CodeFilter: search || '',
      ServiceId: serviceID,
      StateId: stateID,
    });
    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    parseHistory(result?.ListTransHist);
  };

  useEffect(() => {
    onGetHistory();
  }, []); // eslint-disable-line

  const onFilter = () => {
    onGetHistory();
  };

  const onSearch = text => {
    contentRef.current.search = text;
    onSearchDebounce();
  };

  const onSearchDebounce = useCallback(_.debounce(onGetHistory, 1000), []); // eslint-disable-line

  const onDetail = () => {
    Navigator.push(SCREEN.DETAIL_HISTORY);
  };

  return {historyData, onFilter, onSearch, onDetail};
};

export default useHistory;
