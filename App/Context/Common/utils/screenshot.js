import {useRef} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

const useScreenShot = () => {
  const viewShot = useRef();
  const captureAndShareScreenshot = () => {
    try {
      viewShot.current?.capture().then(async uri => {
        console.log('uri :>> ', uri);
        let data = await RNFetchBlob.fs.readFile(uri, 'base64');
        console.log('data :>> ', data);
        let urlString = 'data:image/jpeg;base64,' + data;
        let options = {
          title: '',
          message: '',
          url: urlString,
          type: 'image/jpeg',
        };
        Share.open(options);
        //   RNFS.readFile(uri, 'base64').then((res) => {
        //     let urlString = 'data:image/jpeg;base64,' + res;
        //     let options = {
        //       title: 'Share Title',
        //       message: 'Share Message',
        //       url: urlString,
        //       type: 'image/jpeg',
        //     };
        //     Share.open(options)
        //       .then((res) => {
        //         console.log(res);
        //       })
        //       .catch((err) => {
        //         err && console.log(err);
        //       });
        //   });
      });
    } catch (error) {
      error && console.log(error);
    }
  };
  return {viewShot, captureAndShareScreenshot};
};
export default useScreenShot;
