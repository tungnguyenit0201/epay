import React, { useEffect, useState, useRef, createContext } from 'react';
import { Keyboard } from 'react-native';

export const KeyboardContext = createContext(false);

const KeyboardStateProvider = ({ children }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener(
      'keyboardWillShow',
      () => setIsKeyboardShow(true)
    );
    keyboardHideListener.current = Keyboard.addListener(
      'keyboardWillHide',
      () => setIsKeyboardShow(false)
    );

    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    };
  }, []);

  return (
    <KeyboardContext.Provider value={isKeyboardShow}>
      {children}
    </KeyboardContext.Provider>
  );
};

export default KeyboardStateProvider;
