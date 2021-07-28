import {useState, useEffect, useRef} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import Navigator from 'navigations/Navigator';

const imagePickerOptions = {
  width: 850,
  height: 540,
  cropping: true,
};

const useImagePicker = onSelectImage => {
  const [image, setImage] = useState(null);

  const onPhoto = () => {
    ImagePicker.openPicker(imagePickerOptions).then(image => {
      setImage(image?.path);
    });
  };

  const onCamera = () => {
    ImagePicker.openCamera(imagePickerOptions).then(image => {
      setImage(image?.path);
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

export {useImagePicker, useVerifyInfo};
