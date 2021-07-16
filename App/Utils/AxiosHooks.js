import { useCallback, useEffect, useState } from 'react';
import { request, fetchBlob } from 'utils/Request';
import { toObjectKeys } from './Functions';
import { usePrevious } from 'utils/Hooks';
import { BACKEND } from 'configs/Constants';
import { buildSearchCriteria } from 'utils/Uri';

const usePaging = (API, defaultQuery = {}) => {
  const [data, setData] = useState([]);
  const [pagingState, setPagingState] = useState({
    isFetching: false,
    isRefreshing: false,
    totalPages: 0,
    currentPage: -1
  });
  const [query, setQuery] = useState(defaultQuery);

  const setWithPreviousState = (state) =>
    setPagingState((prevPagingState) => ({
      ...prevPagingState,
      ...state
    }));

  const fetch = useCallback(
    (page = 1) => {
      if (
        (page === 1 || page > pagingState.currentPage) &&
        !pagingState.isFetching
      ) {
        setWithPreviousState({ isFetching: true });
        request({
          method: 'get',
          url: API,
          query: {
            ...query,
            ...buildSearchCriteria('p', 'eq', page, 1, true)
          },
          success: (data) => {
            const { total_count, items } = data?.search_result || {};
            setWithPreviousState({
              isFetching: false,
              currentPage: page,
              totalPages: Math.ceil(total_count / BACKEND.ITEMS_PER_PAGE)
            });
            if (page === 1) {
              setData(items);
            } else {
              const ids = toObjectKeys(items);
              setData((prevData) => [
                ...prevData.filter((item) => !ids[item.id]),
                ...items
              ]);
            }
          },
          failure: () => {
            setWithPreviousState({ isFetching: false });
          }
        });
      }
    },
    [API, pagingState.currentPage, pagingState.isFetching, query]
  );

  const fetchMore = useCallback(() => {
    if (
      pagingState.currentPage !== -1 &&
      !pagingState.isFetching &&
      !pagingState.isRefreshing &&
      pagingState.currentPage < pagingState.totalPages
    ) {
      fetch(pagingState.currentPage + 1);
    }
  }, [fetch, pagingState]);

  const refresh = useCallback(
    (silent = false) => {
      if (!silent) setWithPreviousState({ isRefreshing: true });
      request({
        method: 'get',
        url: API,
        query: {
          ...query,
          ...buildSearchCriteria('p', 'eq', 1, 1, true)
        },
        success: (data) => {
          const { total_count, items } = data?.search_result || {};
          setWithPreviousState({
            isRefreshing: false,
            totalPages: Math.ceil(total_count / BACKEND.ITEMS_PER_PAGE)
          });
          const ids = toObjectKeys(items);
          if (!items?.length) {
            setData([]);
          }
          setData((prevData) => [
            ...items,
            ...prevData.filter((item) => !ids[item.id])
          ]);
        },
        failure: () => {
          setWithPreviousState({ isRefreshing: false });
        }
      });
    },
    [API, query]
  );

  useEffect(() => {
    setData([]);
    fetch();
  }, [query]); // eslint-disable-line

  return [
    data,
    pagingState.isFetching,
    pagingState.isRefreshing,
    fetch,
    fetchMore,
    refresh,
    setQuery,
    pagingState.currentPage
  ];
};

const useRequest = ({ url, method = 'get', headers = {}, fetchOnMount }) => {
  const [requestState, setRequestState] = useState({
    data: null,
    isLoading: false,
    isSuccess: false,
    message: ''
  });
  const prevLoading = usePrevious(requestState.isLoading);

  const doRequest = ({
    url: altUrl,
    params,
    query,
    success,
    failure,
    ignoreResponse
  } = {}) => {
    setRequestState((prevState) => ({
      ...prevState,
      isLoading: true,
      isSuccess: false
    }));

    request({
      url: url || altUrl,
      method,
      params,
      query,
      headers,
      success: (result) => {
        if (ignoreResponse) return;
        setRequestState((prevState) => ({
          ...prevState,
          data: result,
          isLoading: false,
          isSuccess: true
        }));
        if (typeof success === 'function') {
          success(result);
        }
      },
      failure: (result) => {
        if (ignoreResponse) return;
        setRequestState((prevState) => ({
          ...prevState,
          isLoading: false,
          isSuccess: false,
          message: result
        }));
        if (typeof failure === 'function') {
          failure(result);
        }
      }
    });
  };

  useEffect(() => {
    if (fetchOnMount) {
      doRequest();
    }
  }, []); // eslint-disable-line

  return [requestState, doRequest, prevLoading];
};

const useFetchBlob = ({ url, method = 'get' }) => {
  const [requestState, setRequestState] = useState({
    data: null,
    isLoading: false,
    isSuccess: false,
    message: ''
  });
  const prevLoading = usePrevious(requestState.isLoading);

  const doRequest = ({
    params,
    query,
    success,
    failure,
    ignoreResponse
  } = {}) => {
    setRequestState((prevState) => ({
      ...prevState,
      isLoading: true,
      isSuccess: false
    }));

    fetchBlob({
      url,
      method,
      params,
      query,
      success: (result) => {
        if (ignoreResponse) return;
        setRequestState((prevState) => ({
          ...prevState,
          data: result,
          isLoading: false,
          isSuccess: true
        }));
        if (typeof success === 'function') {
          success(result);
        }
      },
      failure: (result) => {
        if (ignoreResponse) return;
        setRequestState((prevState) => ({
          ...prevState,
          isLoading: false,
          isSuccess: false,
          message: result
        }));
        if (typeof failure === 'function') {
          failure(result);
        }
      }
    });
  };
  return [requestState, doRequest, prevLoading];
};

const useAltPaging = (API, defaultQuery = {}) => {
  const [data, setData] = useState([]);
  const [pagingState, setPagingState] = useState({
    isFetching: false,
    isRefreshing: false,
    totalPages: 0,
    currentPage: -1
  });
  const [query, setQuery] = useState(defaultQuery);

  const setWithPreviousState = (state) =>
    setPagingState((prevPagingState) => ({
      ...prevPagingState,
      ...state
    }));

  const fetch = useCallback(
    (page = 1) => {
      if (
        (page === 1 || page > pagingState.currentPage) &&
        !pagingState.isFetching
      ) {
        setWithPreviousState({ isFetching: true });
        request({
          method: 'get',
          url: API.replace(':p', page),
          query,
          success: (data) => {
            const { total_count, items } = data?.[0];
            setWithPreviousState({
              isFetching: false,
              currentPage: page,
              totalPages: Math.ceil(total_count / BACKEND.ALT_ITEMS_PER_PAGE)
            });
            if (page === 1) {
              setData(items);
            } else {
              const ids = toObjectKeys(items);
              setData((prevData) => [
                ...prevData.filter((item) => !ids[item.entity_id]),
                ...items
              ]);
            }
          },
          failure: () => {
            setWithPreviousState({ isFetching: false });
          }
        });
      }
    },
    [API, pagingState.currentPage, pagingState.isFetching, query]
  );

  const fetchMore = useCallback(() => {
    if (
      pagingState.currentPage !== -1 &&
      !pagingState.isFetching &&
      !pagingState.isRefreshing &&
      pagingState.currentPage < pagingState.totalPages
    ) {
      fetch(pagingState.currentPage + 1);
    }
  }, [fetch, pagingState]);

  const refresh = useCallback(
    (silent = false) => {
      if (!silent) setWithPreviousState({ isRefreshing: true });
      request({
        method: 'get',
        url: API.replace(':p', 1),
        query,
        success: (data) => {
          const { total_count, items } = data?.[0];
          setWithPreviousState({
            isRefreshing: false,
            totalPages: Math.ceil(total_count / BACKEND.ALT_ITEMS_PER_PAGE)
          });
          const ids = toObjectKeys(items);
          if (!items?.length) {
            setData([]);
          }
          setData((prevData) => [
            ...items,
            ...prevData.filter((item) => !ids[item.id])
          ]);
        },
        failure: () => {
          setWithPreviousState({ isRefreshing: false });
        }
      });
    },
    [API, query]
  );

  useEffect(() => {
    setData([]);
    fetch();
  }, [query]); // eslint-disable-line

  return {
    data,
    fetch,
    fetchMore,
    refresh,
    setQuery,
    ...pagingState
  };
};

const useAltPaging2 = (API, defaultQuery = {}) => {
  const [data, setData] = useState([]);
  const [pagingState, setPagingState] = useState({
    isFetching: false,
    isRefreshing: false,
    totalPages: 0,
    currentPage: -1
  });
  const [query, setQuery] = useState(defaultQuery);

  const setWithPreviousState = (state) =>
    setPagingState((prevPagingState) => ({
      ...prevPagingState,
      ...state
    }));

  const fetch = useCallback(
    (page = 1) => {
      if (
        (page === 1 || page > pagingState.currentPage) &&
        !pagingState.isFetching
      ) {
        setWithPreviousState({ isFetching: true });
        request({
          method: 'get',
          url: API.replace(':p', page),
          query,
          success: (data) => {
            const { total_count, items } = data;
            setWithPreviousState({
              isFetching: false,
              currentPage: page,
              totalPages: Math.ceil(total_count / BACKEND.ALT_ITEMS_PER_PAGE)
            });
            if (page === 1) {
              setData(items);
            } else {
              const ids = toObjectKeys(items, 'sku');
              setData((prevData) => [
                ...prevData.filter((item) => !ids[item.sku]),
                ...items
              ]);
            }
          },
          failure: () => {
            setWithPreviousState({ isFetching: false });
          }
        });
      }
    },
    [API, pagingState.currentPage, pagingState.isFetching, query]
  );

  const fetchMore = useCallback(() => {
    if (
      pagingState.currentPage !== -1 &&
      !pagingState.isFetching &&
      !pagingState.isRefreshing &&
      pagingState.currentPage < pagingState.totalPages
    ) {
      fetch(pagingState.currentPage + 1);
    }
  }, [fetch, pagingState]);

  const refresh = useCallback(
    (silent = false) => {
      if (!silent) setWithPreviousState({ isRefreshing: true });
      request({
        method: 'get',
        url: API.replace(':p', 1),
        query,
        success: (data) => {
          const { total_count, items } = data;
          setWithPreviousState({
            isRefreshing: false,
            totalPages: Math.ceil(total_count / BACKEND.ALT_ITEMS_PER_PAGE)
          });
          const ids = toObjectKeys(items, 'sku');
          if (!items?.length) {
            setData([]);
          }
          setData((prevData) => [
            ...items,
            ...prevData.filter((item) => !ids[item?.sku])
          ]);
        },
        failure: () => {
          setWithPreviousState({ isRefreshing: false });
        }
      });
    },
    [API, query]
  );

  useEffect(() => {
    setData([]);
    fetch();
  }, [query]); // eslint-disable-line

  return {
    data,
    fetch,
    fetchMore,
    refresh,
    setQuery,
    ...pagingState
  };
};

export { usePaging, useRequest, useFetchBlob, useAltPaging, useAltPaging2 };
