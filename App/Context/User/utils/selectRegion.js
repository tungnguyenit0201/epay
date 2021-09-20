import {useState, useEffect, useRef} from 'react';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {getProvince, getDistrict, getWard} from 'services/region';
import {useUser} from 'context/User';

const useSelectRegion = ({items, type, parentType, callbackScreen} = {}) => {
  // const [values, setValues] = useState();
  // const [search, setSearch] = useState('');
  const translation = useTranslation();
  const {region, dispatch} = useUser();
  console.log('region :>> ', region);
  // dispatch({
  //   type: 'SET_REGION',
  //   data: {},
  // });
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {getPhone} = useAsyncStorage();
  const pleaseChooseFirst = type => {
    setError({ErrorCode: -1, ErrorMessage: `Vui lòng chọn ${type} trước`}); // TODO: translate
  };

  const escapeRegex = string => string?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const onGetProvince = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getProvince({phone});

      setLoading(false);
      if (result?.ErrorCode == ERROR_CODE.SUCCESS)
        return result?.ProvinceInfoList;
      else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetDistrict = async ({ProvinceID}) => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getDistrict({ProvinceID, phone});
      setLoading(false);
      if (result?.ErrorCode == ERROR_CODE.SUCCESS)
        return result?.DistrictInfoList;
      else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetWard = async ({DistrictID}) => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getWard({DistrictID, phone});
      setLoading(false);

      if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
        return result?.WardInfoList;
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const goRegionSelect = async (_type, _handleChange) => {
    switch (_type) {
      case 'cites':
        let cities = await onGetProvince();
        Navigator.navigate('RegionSelect', {
          items: cities,
          type: _type,
          parentType: type,
          callbackScreen,
        });
        break;
      case 'districts':
        if (!region?.ProvinceID) {
          pleaseChooseFirst(translation.provice);
        } else {
          let _items = [];
          if (!type)
            _items = await onGetDistrict({
              ProvinceID: region?.ProvinceID,
            });
          Navigator.navigate('RegionSelect', {
            items: type ? items : _items,
            type: _type,
            parentType: type,
            callbackScreen,
          });
        }
        break;
      case 'wards':
        if (!region?.DistrictID) {
          pleaseChooseFirst(translation.district);
        } else {
          let _items = [];
          if (!type) _items = await onGetWard({DistrictID: region?.DistrictID});
          Navigator.navigate('RegionSelect', {
            items: type ? items : _items,
            type: _type,
            parentType: type,
            callbackScreen,
          });
        }
        break;
    }
  };

  const onSelected = async item => {
    if (type === 'cites') {
      dispatch({
        type: 'SET_REGION',
        data: {...region, Provincial: item?.ProvinceName, ...item},
      });
      const _items = await onGetDistrict({
        ProvinceID: item?.ProvinceID.toString(),
      });
      Navigator.push('RegionSelect', {
        items: _items,
        type: 'districts',
        parentType,
        callbackScreen,
      });
    } else if (type === 'districts') {
      dispatch({
        type: 'SET_REGION',
        data: {...region, County: item?.DistrictName, ...item},
      });
      const _items = await onGetWard({DistrictID: item?.DistrictID});
      if (!_items?.length) {
        Navigator.navigate(callbackScreen, {
          type: parentType,
        });
      } else {
        Navigator.push('RegionSelect', {
          items: _items,
          type: 'wards',
          parentType,
          callbackScreen,
        });
      }
    } else if (type === 'wards') {
      console.log('callbackScreen', callbackScreen);
      dispatch({
        type: 'SET_REGION',
        data: {...region, Ward: item?.WardName, ...item},
      });
      Navigator.navigate(callbackScreen, {
        type: parentType,
      });
    }
  };

  const onClearRegionData = () => {
    dispatch({
      type: 'SET_REGION',
      data: {
        Provincial: '',
        County: '',
        Ward: '',
      },
    });
  };

  // useEffect(() => {
  //   setValues(
  //     items?.filter(item => {
  //       return (
  //         !!item.value &&
  //         RegExp(`${escapeRegex(search)}`, 'i').test(item?.label)
  //       );
  //     }),
  //   );
  // }, [search]);

  return {goRegionSelect, onSelected, onClearRegionData};
};
export default useSelectRegion;
