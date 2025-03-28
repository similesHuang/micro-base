import React from 'react';
import GlobalProvider from './globalProvider';
import actions, { initState } from './qiankunGlobal';

export type StateType = {
  theme: string;
  searchValue: string;
};
export type ProviderProps = {
  children: React.ReactNode;
};
type ActionType =
  | {
      type: 'SET_THEME';
      payload: 'light' | 'dark';
    }
  | {
      type: 'SET_SEARCH_VALUE';
      payload: string;
    };

const Provider = ({ children }: ProviderProps) => {
  const reducer = (state: StateType, action: ActionType): StateType => {
    const htmlEl = document.getElementsByTagName('html')[0];

    switch (action.type) {
      case 'SET_THEME': {
        htmlEl?.setAttribute('data-theme', action.payload);
        actions.setGlobalState({ theme: action.payload });
        return {
          ...state,
          theme: action.payload
        };
      }
      case 'SET_SEARCH_VALUE': {
        actions.setGlobalState({ searchValue: action.payload });
        return {
          ...state,
          searchValue: action.payload
        };
      }

      default:
        return state;
    }
  };

  return (
    <GlobalProvider reducer={reducer} initState={initState}>
      {children}
    </GlobalProvider>
  );
};

export default Provider;
