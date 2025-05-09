import React, { useState } from 'react';
import { routes } from '@/routes';
import { R } from '@/routes';
import { useNavigate } from 'react-router-dom';

interface MicroMenuProps {
  onClose: () => void;
}
const MicroMenu: React.FC<MicroMenuProps> = ({ onClose }) => {
  const [selectdMenu, setSelectedMenu] = useState('home');
  const navigate = useNavigate();

  const renderMenus = (menus: R[]): React.ReactNode => {
    return menus.map(menu => {
      if (menu.key !== 'index') {
        if (!menu.children) {
          return (
            <div
              key={menu.key}
              className={`menu-card ${menu.key === selectdMenu ? 'menu-card-selected' : ''}`}
              onClick={() => {
                setSelectedMenu(menu.key);
                const path = menu.path || '/';
                const url =
                  path.charAt(path.length - 1) === '*' ? path.slice(0, path.length - 2) : path;
                navigate(url);
                onClose();
              }}
            >
              <span className='menu-card-icon'> {menu.icon}</span>
              <span>{menu.title}</span>
            </div>
          );
        }
        return (
          <div key={menu.key}>
            <b>{menu.key !== 'app' ? menu.title : null}</b>
            {renderMenus(menu.children)}
          </div>
        );
      }
    });
  };

  return <div className='menu'>{renderMenus(routes)}</div>;
};
export default MicroMenu;
