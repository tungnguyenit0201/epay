import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {useError} from 'context/Common/utils';
import {useUser} from 'context/User';
import Navigator from 'navigations/Navigator';
import {useEffect, useState, useRef, useCallback} from 'react';
import {getHistory} from 'services/wallet';
import _ from 'lodash';
import moment from 'moment';

const useHistory = () => {
  const {phone} = useUser();
  const [historyData, setHistoryData] = useState([]);
  const {setError} = useError();
  const contentRef = useRef({
    search: '',
    startDate: moment().format('DD-MM-YYYY hh:mm:ss'),
    endDate: moment().subtract(1, 'months').format('DD-MM-YYYY hh:mm:ss'),
    serviceID: 0,
    stateID: 0,
  });

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
    setHistoryData(result?.ListTransHist);
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
