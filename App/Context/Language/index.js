import React, {useState, useContext} from 'react';
import en from './en.json';
import vi from './vi.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = React.createContext();

const languageObj = {
  en: en,
  vi: vi,
};

export const LanguageProvider = ({children}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const setLanguage = async lang => {
    try {
      setSelectedLanguage(lang);
      await AsyncStorage.setItem('currentLanguage', lang);
    } catch (error) {}
  };

  const value = {
    ...languageObj[selectedLanguage],
    setLanguage,
    selectedLanguage,
  };
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
