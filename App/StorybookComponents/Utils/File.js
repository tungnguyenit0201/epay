import RNFetchBlob from 'rn-fetch-blob';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
const getLinkDownload = url => {
  if (!!url) {
    let index = url.search('http');
    if (index != -1) {
      return url.slice(index).split('\\')[0];
    }
  }
  return url;
};
const getNameFile = url => {
  if (!!url) {
    let arr = url.split('/');
    if (arr.length > 0) return arr[arr.length - 1];
  }
  return url;
};
const downloadFile = async document => {
  try {
    let dirs = RNFetchBlob.fs.dirs;
    let link = getLinkDownload(document);
    let name = getNameFile(link);
    const dirToSave =
      Platform.OS == 'ios'
        ? `Files/On My iPhone/MangoLMs`
        : `My Files/Downloads`;
    // Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;

    if (Platform.OS == 'android') {
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      granted !== PermissionsAndroid.RESULTS.GRANTED &&
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
    }
    let res = await RNFetchBlob.config({
      fileCache: true,
      path: `${dirToSave}/${name}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `test.pdf`,
        path: `${dirToSave}/${name}`,
      },
    })
      .fetch('GET', link)
      .then(res => {
        Alert.alert(
          'Tải xuống thành công!',
          `Hãy kiểm tra thư mục 
          ${dirToSave}`,
        );
        console.log('The file saved to ', res.path(), link);
      });

    return `${dirToSave}/${name}`;
  } catch (error) {
    if (error) Alert.alert('Lỗi', error?.message);
    return null;
  }
};

export {downloadFile};
