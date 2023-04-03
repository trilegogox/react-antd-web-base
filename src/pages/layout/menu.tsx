import { FC } from 'react';
import { Menu, MenuProps } from 'antd';
import { MenuList } from '../../interface/layout/menu.interface';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserItem } from '@/stores/user.store';
import { useLocale } from '@/locales';

interface MenuComponentProps {
  menuList: MenuList;
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuComponentProps> = props => {
  const { menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
  const { device } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const items: MenuProps['items'] = menuList.map(item => {
    return item.children
      ? {
          key: item.code,
          label: formatMessage({
            id: `menu.${item.code}`,
          }),
          icon: item.icon, //<DynamicIcon type={item.icon || ''} size="18px" />,
          children: item.children.map(child => ({
            key: child.path,
            label: formatMessage({
              id: `menu.${child.code}`,
            }),
          })),
        }
      : {
          key: item.path,
          label: formatMessage({
            id: `menu.${item.code}`,
          }),
          icon: item.icon, //<DynamicIcon type={item.icon || ''} size="18px" />,
        };
  });

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);
    if (device !== 'DESKTOP') {
      dispatch(setUserItem({ collapsed: true }));
    }
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onClick={k => onMenuClick(k.key)}
      className="ant-menu-custom"
      items={items}
    ></Menu>
  );
};

export default MenuComponent;
