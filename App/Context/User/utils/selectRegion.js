import {useState, useEffect, useRef} from 'react';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {getProvince, getDistrict, getWard} from 'services/region';
import {useUser} from 'context/User';

const useSelectRegion = ({items, type, parentType}) => {
  const [values, setValues] = useState();
  const [search, setSearch] = useState('');
  const translation = useTranslation();
  const {region, dispatch} = useUser();

  const {setError} = useError();
  const {setLoading} = useLoading();
  const {getPhone} = useAsyncStorage();
  const pleaseChooseFirst = type => {
    setError({ErrorCode: -1, ErrorMessage: `Vui lòng chọn ${type} trước`}); //translate
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
        });
        break;
      case 'districts':
        if (!type) {
          pleaseChooseFirst(translation.provice);
        } else {
          Navigator.navigate('RegionSelect', {
            items,
            type: _type,
            parentType: type,
          });
        }
        break;
      case 'wards':
        if (!type) {
          pleaseChooseFirst(translation.district);
        } else {
          Navigator.navigate('RegionSelect', {
            items,
            type: _type,
            parentType: type,
          });
        }
        break;
    }
  };

  const onSelected = async item => {
    if (type === 'cites') {
      dispatch({
        type: 'SET_REGION',
        data: {...region, Provincial: item?.ProvinceName},
      });
      const _items = await onGetDistrict({
        ProvinceID: item?.ProvinceID.toString(),
      });
      Navigator.push('RegionSelect', {
        items: _items,
        type: 'districts',
        parentType,
      });
    } else if (type === 'districts') {
      dispatch({
        type: 'SET_REGION',
        data: {...region, County: item?.DistrictName},
      });
      const _items = await onGetWard({DistrictID: item?.DistrictID});
      if (!_items?.length) {
        Navigator.navigate('VerifyUserPortrait', {
          type: parentType,
        });
      } else {
        Navigator.push('RegionSelect', {
          items: _items,
          type: 'wards',
          parentType,
        });
      }
    } else if (type === 'wards') {
      dispatch({type: 'SET_REGION', data: {...region, Ward: item?.WardName}});
      Navigator.navigate('VerifyUserPortrait', {
        type: parentType,
      });
    }
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

  return {goRegionSelect, onSelected};
};
export default useSelectRegion;
