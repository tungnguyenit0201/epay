import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import Navigator from 'navigations/Navigator';
const useLanguage = () => {
  const {setLanguage} = useTranslation();

  const chooseLanguage = lang => {
    setLanguage(lang);
    Navigator.navigate(SCREEN.AUTH);
  };
  return {chooseLanguage};
};
export {useLanguage};
