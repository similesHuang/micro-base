import React from 'react';
import GlobalProvider from './globalProvider';

export type StateType = {
  theme: string;
};
export type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const initState: StateType = {
    theme: 'light'
  };

  const themeReducer = (state: StateType, action: { type: string }): StateType => {
    const htmlEl = document.getElementsByTagName('html')[0];

    switch (action.type) {
      case 'light': {
        htmlEl?.setAttribute('data-theme', 'light');

        return {
          ...state,
          theme: 'light'
        };
      }
      case 'dark': {
        htmlEl?.setAttribute('data-theme', 'dark');

        return {
          ...state,
          theme: 'dark'
        };
      }

      default:
        return { ...state };
    }
  };

  return (
    <GlobalProvider reducer={themeReducer} initState={initState}>
      {children}
    </GlobalProvider>
  );
};

export default ThemeProvider;
