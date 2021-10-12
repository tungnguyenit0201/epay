import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
import {useAsyncStorage} from 'context/Common/utils';

const useLanguage = () => {
  const {setLanguage, selectedLanguage} = useTranslation();
  const {getToken} = useAsyncStorage();

  const chooseLanguage = async lang => {
    if (lang === selectedLanguage) {
      return;
    }
    setLanguage(lang);
    const token = await getToken();
    if (token) {
      Navigator.reset(SCREEN.TAB_NAVIGATION);
    } else {
      Navigator.reset(SCREEN.BOADRING);
    }
  };
  return {chooseLanguage};
};
export {useLanguage};
