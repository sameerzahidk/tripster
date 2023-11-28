'use client';

import { createContext, useContext, useState } from 'react';

const ALERT_TIME = 2000;

const AlertContext = createContext();

export function AlertContextProvider({ children }) {
  const [text, setText] = useState('');
  const [type, setType] = useState('');

  const setAlert = (text, type) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText('');
      setType('');
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider value={{ text, type, setText, setType, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  return useContext(AlertContext);
}
