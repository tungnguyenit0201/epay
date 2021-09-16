import RNFetchBlob from 'rn-fetch-blob';
import {useRef, useState} from 'react';
import ImageEditor from '@react-native-community/image-editor';
import {useWindowDimensions, Platform} from 'react-native';
import {scale} from 'utils/Functions';

const useDropImage = () => {
  const camera = useRef();
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const diemsion = useWindowDimensions();
  let [loading, setLoading] = useState(false);

  const capturePicture = async (onDropImage, isDrop) => {
    setLoading(true);
    if (camera.current) {
      camera.current
        .takePictureAsync({base64: true})
        .then(async capturedImg => {
          const {uri, width, height} = capturedImg;
          console.log('capturedImg :>> ', capturedImg);
          // tỉ lệ màn hình so với tỉ lệ image
          let scaleWidth = width / diemsion.width;
          let scaleHeight = height / diemsion.height;

          let widthImg = scale(300) * scaleWidth;
          let heightImg = scale(180) * scaleHeight;
          let path = await ImageEditor.cropImage(
            uri,
            {
              offset: {
                x: 37 * scaleWidth,
                y: 170 * scaleHeight,
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
          let file = await RNFetchBlob.fs.readFile(path, 'base64');
          //   console.log('file :>> ', file);
          setImage({path, data: file});
          !!onDropImage && onDropImage({path, data: file});
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
    setImage,
    setShowCamera,
    capturePicture,
  };
};
export default useDropImage;
