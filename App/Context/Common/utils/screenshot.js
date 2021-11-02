import {useRef} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
import CameraRoll from '@react-native-community/cameraroll';
import {PermissionsAndroid, Platform} from 'react-native';

const useScreenShot = () => {
  const viewShot = useRef();
  const capture = async () => {
    try {
      let uri = await viewShot.current?.capture();
      console.log('uri :>> ', uri);
      let data = await RNFetchBlob.fs.readFile(uri, 'base64');
      console.log('data :>> ', data);
      let urlString = 'data:image/jpeg;base64,' + data;

      return urlString;
    } catch (error) {
      error && console.log(error);
    }
  };
  const captureAndShareScreenshot = async () => {
    try {
      let urlString = await capture();
      let options = {
        title: '',
        message: '',
        url: urlString,
        type: 'image/jpeg',
      };
      Share.open(options);
      //   console.log('uri :>> ', uri);
      //   let data = await RNFetchBlob.fs.readFile(uri, 'base64');
      //   console.log('data :>> ', data);
      //   let urlString = 'data:image/jpeg;base64,' + data;
      //   let options = {
      //     title: '',
      //     message: '',
      //     url: urlString,
      //     type: 'image/jpeg',
      //   };
      //   Share.open(options);

      // });
    } catch (error) {
      error && console.log(error);
    }
  };
  const saveScreenshot = async () => {
    let urlString = await capture();
    if (Platform.OS == 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    }
    const image = CameraRoll.save(urlString, 'photo');
  };
  return {viewShot, captureAndShareScreenshot, saveScreenshot};
};
export default useScreenShot;
