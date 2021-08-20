import {useState, useEffect, useRef} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {getConfigInfo} from 'services/auth';
import {updatePersonalInfo, getPersonalInfo} from 'services/user';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
const imagePickerOptions = {
  width: 850,
  height: 540,
  cropping: true,
};

const useImagePicker = onSelectImage => {
  const [image, setImage] = useState(null);

  const onPhoto = () => {
    ImagePicker.openPicker(imagePickerOptions).then(image => {
      setImage(image);
    });
  };

  const onCamera = () => {
    ImagePicker.openCamera(imagePickerOptions).then(image => {
      setImage(image);
    });
  };

  useEffect(() => {
    onSelectImage && onSelectImage(image);
  }, [image]);

  return {image, onPhoto, onCamera};
};

const useVerifyInfo = (initialValue = {}) => {
  const contentRef = useRef(initialValue);

  const onChange = (key, value) => {
    contentRef.current[key] = value;
  };

  const onContinue = screen => {
    Navigator.navigate(screen, contentRef.current);
  };

  return {data: contentRef.current, onChange, onContinue};
};
const useUserInfo = () => {
  let personalInfo = useRef({
    FullName: '',
    DateOfBirth: '',
    SexType: 0,
    Avatar: '',
    Email: '',
  });

  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useUser();

  const setPersonalInfo = (key, value) => {
    personalInfo.current[key] = value;
  };

  const onGetPersonalInfo = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      setLoading(false);
      let result = await getPersonalInfo({phone});
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        dispatch({
          type: 'SET_PERSONAL_INFO',
          personalInfo: result?.PersonalInfo,
        });
        dispatch({type: 'SET_PHONE', phone});
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdatePersonalInfo = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await updatePersonalInfo({
        phone,
        personalInfo: personalInfo.current,
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS)
        Navigator.navigate(SCREEN.TAB_NAVIGATION);
      else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    personalInfo: personalInfo.current,
    onUpdatePersonalInfo,
    setPersonalInfo,
    onGetPersonalInfo,
  };
};

export {useImagePicker, useVerifyInfo, useUserInfo};
