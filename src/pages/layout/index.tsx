import { FC, useEffect, useCallback, useState, Suspense } from 'react';
import { Layout, Drawer, theme as antTheme } from 'antd';
import './index.less';
import MenuComponent from './menu';
import HeaderComponent from './header';
import { getGlobalState } from '@/utils/common';
//import TagsView from './tagView';
import { getMenuList } from '@/configs/userMenu';
import { MenuList, MenuChild } from '@/interface/layout/menu.interface';
import { useGuide } from '../guide/useGuide';
import { Outlet, useLocation } from 'react-router';
import { setUserItem } from '@/stores/user.store';
import { useDispatch, useSelector } from 'react-redux';
import { getFirstPathCode } from '@/utils/getFirstPathCode';
import ReactSvg from '@/assets/logo/react.svg';

const { Sider, Content } = Layout;
const WIDTH = 992;

export interface LayoutProps {
  auth?: boolean;
}

const LayoutPage: FC<LayoutProps> = ({ auth }) => {
  const location = useLocation();
  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const [menuList, setMenuList] = useState<MenuList>([]);
  const { device, collapsed, newUser, role } = useSelector(state => state.user);
  const token = antTheme.useToken();

  const isMobile = device === 'MOBILE';
  const dispatch = useDispatch();
  const { driverStart } = useGuide();

  useEffect(() => {
    const code = getFirstPathCode(location.pathname);

    setOpenkey(code);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const toggle = () => {
    dispatch(
      setUserItem({
        collapsed: !collapsed,
      }),
    );
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];

    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu);
        });
      }
    });

    return MenuListAll;
  };

  const fetchMenuList = useCallback(() => {
    const menuList = getMenuList(role);

    if (menuList !== null) {
      setMenuList(menuList);
      dispatch(
        setUserItem({
          menuList: initMenuListAll(menuList),
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;

      dispatch(
        setUserItem({
          device,
          collapsed: needCollapse,
        }),
      );
    };
  }, [dispatch]);

  useEffect(() => {
    newUser && driverStart();
  }, [newUser]);

  return (
    <Layout className="layout-page">
      {auth ? <HeaderComponent collapsed={collapsed} toggle={toggle} /> : <div>New header</div>}
      <Layout>
        {!isMobile ? (
          <Sider
            className="layout-page-sider transition ease-linear duration-500"
            trigger={null}
            collapsible
            style={{ backgroundColor: token.token.colorBgContainer }}
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="md"
          >
            <MenuComponent
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={k => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={k => setSelectedKey(k)}
            />
          </Sider>
        ) : (
          <Drawer
            width="250"
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            open={!collapsed}
          >
            <div className="flex w-full justify-center items-center py-2">
              <img src={ReactSvg} />
            </div>
            <MenuComponent
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={k => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={k => setSelectedKey(k)}
            />
          </Drawer>
        )}
        <Content className="layout-page-content">
          {/* <TagsView /> */}
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
