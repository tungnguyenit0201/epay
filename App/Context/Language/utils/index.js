import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
const useLanguage = () => {
  const {setLanguage, selectedLanguage} = useTranslation();

  const chooseLanguage = lang => {
    if (lang === selectedLanguage) {
      return;
    }
    setLanguage(lang);
    Navigator.reset(SCREEN.BOADRING);
  };
  return {chooseLanguage};
};
export {useLanguage};
