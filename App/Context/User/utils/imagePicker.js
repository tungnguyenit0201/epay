import {useState, useEffect, useRef} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import _ from 'lodash';
const imagePickerOptions = {
  width: 850,
  height: 540,
  cropping: true,
  includeBase64: true,
};

const useImagePicker = onSelectImage => {
  const [image, setImage] = useState(null);

  const onPhoto = (cropping = true) => {
    ImagePicker.openPicker({...imagePickerOptions, cropping}).then(image => {
      setImage(image);
      !!onSelectImage && onSelectImage(image);
    });
  };

  const onCamera = () => {
    ImagePicker.openCamera(imagePickerOptions).then(image => {
      !!onSelectImage && onSelectImage(image);
      setImage(image);
    });
  };

  useEffect(() => {
    onSelectImage && onSelectImage(image);
  }, [image]); // eslint-disable-line

  return {image, onPhoto, onCamera};
};
export default useImagePicker;
