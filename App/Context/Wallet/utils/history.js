import {COMMON_ENUM, ERROR_CODE, SCREEN, TRANS_TYPE} from 'configs/Constants';
import {useError, useLoading} from 'context/Common/utils';
import {useUser} from 'context/User';
import Navigator from 'navigations/Navigator';
import {useEffect, useState, useRef, useCallback} from 'react';
import useServiceWallet from 'services/wallet';
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
  const [historyData, setHistoryData] = useState(null);
  const {setError} = useError();
  const {getHistory, getHistoryDetail} = useServiceWallet();
  const {setLoading} = useLoading();
  const [showFilter, setShowFilter] = useState(false);
  const contentRef = useRef({
    search: '',
    startDate: null,
    endDate: null,
    serviceID: [],
    stateID: 0,
    type2: [],
    tempFilter: {},
  });

  const parseHistory = data => {
    // parser for grouping
    const parser = item => {
      const time = moment(item?.TransTime, COMMON_ENUM.DATETIME_FORMAT_CORE);
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
    setHistoryData(null);
    const result = await getHistory({
      phone,
      StartDate: startDate || moment().format(COMMON_ENUM.DATETIME_FORMAT_CORE),
      EndDate: endDate || moment().format(COMMON_ENUM.DATETIME_FORMAT_CORE),
      CodeFilter: search || '',
      ServiceId: serviceID.join(',') || 0,
      StateId: stateID,
      DatetimeFilter: startDate && endDate ? 1 : 0,
    });
    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    // parseHistory(result?.ListTransHist);
    setHistoryData(
      result?.ListTransHist.map(item => ({
        ...item,
        isIncome: incomeType.includes(item?.TransType),
      })),
    );
  };

  useEffect(() => {
    initTempFilter();
    onGetHistory();
  }, []); // eslint-disable-line

  const onSearch = text => {
    contentRef.current.search = text;
    onSearchDebounce();
  };

  const onSearchDebounce = useCallback(_.debounce(onGetHistory, 1000), []); // eslint-disable-line

  const onDetail = async item => {
    setLoading(true);
    const result = await getHistoryDetail({phone, TransCode: item?.TransCode});
    setLoading(false);

    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
    }

    Navigator.push(SCREEN.DETAIL_HISTORY, {
      data: {..._.get(result, 'TransDetail', {}), isIncome: item?.isIncome},
    });
  };

  const onToggleFilter = () => {
    setShowFilter(showFilter ? 0 : 1);
  };

  const onFilter = () => {
    contentRef.current = {
      ...contentRef.current,
      ...contentRef.current.tempFilter,
    };
    onToggleFilter();
    onGetHistory();
  };

  const onSetTempFilter = ({type, value}) => {
    contentRef.current.tempFilter[type] = value;
  };

  const onResetTempFilter = () => {
    initTempFilter();
    setShowFilter(showFilter + 1); // to rerender filter modal
  };

  const initTempFilter = () => {
    contentRef.current.tempFilter = {
      startDate: null,
      endDate: null,
      serviceID: [],
      stateID: 0,
      type2: [],
    };
  };

  return {
    historyData,
    isFiltering: contentRef.current.search,
    showFilter,
    filterData: contentRef.current.tempFilter,
    onFilter,
    onSearch,
    onDetail,
    onGetHistory,
    onToggleFilter,
    onSetTempFilter,
    onResetTempFilter,
  };
};

export default useHistory;
