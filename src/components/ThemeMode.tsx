import React from 'react';

import { useDispatch, useStore } from '@/hooks/globalProvider';
import { CheckCircleTwoTone } from '@ant-design/icons';

type ModeProps = {
  key: string;
  imgUrl: string;
};
interface ThemeModeProps {
  modes: ModeProps[];
}
const ThemeMode: React.FC<ThemeModeProps> = ({ modes }) => {
  const { theme } = useStore();
  const dispatch = useDispatch();

  const renderModeList = () => {
    if (modes.length) {
      return modes.map(mode => {
        return (
          <div
            key={mode.key}
            className='theme-container-list-card'
            onClick={() =>
              dispatch &&
              dispatch({ type: 'SET_THEME', payload: theme === 'light' ? 'dark' : 'light' })
            }
          >
            <div
              style={{ padding: '5px', position: 'relative' }}
              className={`${
                theme === mode.key
                  ? 'theme-container-list-card-selectd'
                  : 'theme-container-list-card-unselected'
              }`}
            >
              <img src={mode.imgUrl}></img>
              {theme === mode.key && (
                <span style={{ position: 'absolute', bottom: '5px', right: '20px' }}>
                  <CheckCircleTwoTone />
                </span>
              )}
            </div>
            <span>{mode.key === 'light' ? '浅色模式' : '深色模式'}</span>
          </div>
        );
      });
    }
    return <span>暂无主题</span>;
  };
  return (
    <div className='theme-container'>
      <b>主题</b>
      <br />
      <div className='theme-container-list'>{renderModeList()}</div>
    </div>
  );
};
export default ThemeMode;
