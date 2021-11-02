import RNFetchBlob from 'rn-fetch-blob';
import {useRef, useState} from 'react';
import ImageEditor from '@react-native-community/image-editor';
import {useWindowDimensions, Platform} from 'react-native';
import {scale} from 'utils/Functions';
import {usePermission} from 'context/Common/utils';

const useDropImage = () => {
  const camera = useRef();
  const [image, setImage] = useState(null);
  const [showCamera, setShow] = useState(false);
  const [opacity, setOpacity] = useState(false);
  const diemsion = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  const {checkPermission} = usePermission();
  const setShowCamera = async value => {
    let result = await checkPermission(
      () => setShow(value),
      () => setShow(false),
    );
  };
  const dropImage = async capturedImg => {
    const {uri, width, height} = capturedImg;
    // tỉ lệ màn hình so với tỉ lệ image
    let scaleWidth = width / diemsion.width;
    let scaleHeight = height / diemsion.height;

    let widthImg = scale(300) * scaleWidth;
    let heightImg = scale(180) * scaleHeight;
    let path = await ImageEditor.cropImage(
      uri,
      {
        offset: {
          x: scale(37) * scaleWidth,
          y: scale(170) * scaleHeight,
        },
        size: {width: widthImg, height: heightImg},
        displaySize: {width: widthImg, height: heightImg},
      },
      error => {
        console.error('Error resizing image: ', error);
      },
    );
    if (Platform.OS === 'ios') {
      path = path.replace('file://', '');
    }
    let data = await RNFetchBlob.fs.readFile(path, 'base64');
    return {path, data};
  };

  const capturePicture = async (onDropImage, isDrop) => {
    setLoading(true);
    if (camera.current) {
      camera.current
        .takePictureAsync({base64: true})
        .then(async capturedImg => {
          const {uri, base64, width, height} = capturedImg;
          let raito = width / height;
          let result = {
            path: uri,
            data: base64,
            widthImg: scale(150),
            heightImg: scale(150) / raito,
          };

          if (isDrop) result = await dropImage(capturedImg);

          setImage(result);
          !!onDropImage && onDropImage(result);
          setShowCamera(2);
          setLoading(false);
        })
        .catch(error => {
          console.log('Could not capture image.', error);
          setLoading(false);
          setShowCamera(false);
        });
    }
  };

  return {
    image,
    camera,
    showCamera,
    loading,
    opacity,
    setImage,
    setShowCamera,
    capturePicture,
    setOpacity,
  };
};
export default useDropImage;
