import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import qs from 'query-string';

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useCityId(toQueryString = false) {
  const cityId = useSelector((state) => state.region.city?.value);
  return toQueryString ? qs.stringify({ cityId }) : cityId;
}
