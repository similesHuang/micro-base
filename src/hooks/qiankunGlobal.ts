import { initGlobalState, MicroAppStateActions } from 'qiankun';

//qiankun全局变量
const themeActions: MicroAppStateActions = initGlobalState({ theme: 'light' });
export const { setGlobalState, onGlobalStateChange } = themeActions;
