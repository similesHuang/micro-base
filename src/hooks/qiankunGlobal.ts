import { initGlobalState, MicroAppStateActions } from 'qiankun';

//qiankun全局状态
const themeActions: MicroAppStateActions = initGlobalState({ theme: 'light', searchValue: '' });
export const { setGlobalState, onGlobalStateChange } = themeActions;
