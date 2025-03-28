import React, { createContext, useContext, useEffect, useReducer } from 'react';
import actions from './qiankunGlobal';

// 定义 Dispatch 类型
type Dispatch<Action> = (action: Action) => void;

export type GlobalProviderProps<State, Action> = {
  reducer: (state: State, action: Action) => State;
  initState: State;
  children: React.ReactNode;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DispatchContext = createContext<Dispatch<any> | (() => void)>(() => {});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreContext = createContext<any>({});

const GlobalProvider = <State extends object, Action>({
  reducer,
  initState,
  children
}: GlobalProviderProps<State, Action>) => {
  const [store, dispatch] = useReducer(reducer, initState);

  // 监听子应用状态变化
  useEffect(() => {
    // 暂时先不处理
    actions.onGlobalStateChange(state => {
      console.log('子应用传过来的', state);
    });

    return () => {
      actions.offGlobalStateChange();
    };
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
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
