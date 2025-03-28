import React, { createContext, useContext, useEffect, useReducer } from 'react';
import actions from './qiankunGlobal';

type BaseAction = {
  type: string;
  payload?: unknown;
};
// 定义 Dispatch 类型
type Dispatch<Action extends BaseAction> = (action: Action) => void;

export type GlobalProviderProps<State, Action extends BaseAction> = {
  reducer: (state: State, action: Action) => State;
  initState: State;
  children: React.ReactNode;
};

const DispatchContext = createContext<Dispatch<BaseAction>>(() => {});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreContext = createContext<Record<string, any>>({});

const GlobalProvider = <State extends object, Action extends BaseAction>({
  reducer,
  initState,
  children
}: GlobalProviderProps<State, Action>) => {
  const [store, dispatch] = useReducer(reducer, initState);

  // 监听子应用状态变化
  useEffect(() => {
    actions.onGlobalStateChange(state => {
      dispatch({ type: 'SYNC_STATE', payload: { ...state } } as Action);
    });

    return () => {
      actions.offGlobalStateChange();
    };
  }, []);

  return (
    <DispatchContext.Provider value={dispatch as Dispatch<BaseAction>}>
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
};

export default GlobalProvider;
export function useDispatch() {
  return useContext(DispatchContext);
}
export function useStore() {
  return useContext(StoreContext);
}
