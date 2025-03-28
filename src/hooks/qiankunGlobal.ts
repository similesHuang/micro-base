import { initGlobalState, MicroAppStateActions } from 'qiankun';

export interface InitStateProps {
  theme: string;
  searchValue: string;
  [key: string]: unknown;
}

export const initState: InitStateProps = {
  theme: 'light',
  searchValue: ''
};

export interface getGlobalState {
  <K extends keyof InitStateProps>(key: K): InitStateProps[K] | InitStateProps;
}
interface CustomMicroAppStateActions extends MicroAppStateActions {
  getGlobalState: getGlobalState;
}

const actions: CustomMicroAppStateActions = initGlobalState(
  initState
) as CustomMicroAppStateActions;

actions.onGlobalStateChange((newState: Partial<InitStateProps>) => {
  Object.keys(initState).forEach(key => (initState[key] = newState[key]));
});

actions.getGlobalState = (key?: keyof InitStateProps) => {
  return key ? initState[key] : initState;
};

export default actions;
