import { FC, useState } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Dropdown, Tooltip, theme as antTheme, Badge, Avatar, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ViVNSvg } from '@/assets/header/vi_VN.svg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import ReactSvg from '@/assets/logo/react.svg';
import { logoutAsync, setUserItem } from '@/stores/user.store';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalState } from '@/stores/global.store';
import { Bell, Globe, Menu, LogIn } from 'react-feather';
import { getInitial } from '@/utils/common';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, locale, device, noticeCount, avatar, displayName } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.global);
  const [open, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()));

        res && navigate('/login');

        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem('locale', key);
  };

  const showDrawer = (state: boolean) => {
    if (state && noticeCount == 0) return;
    setOpenDrawer(state);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  return (
    <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          <img src={ReactSvg} />
        </div>
      )}
      <div className="layout-page-header-main">
        <div id="sidebar-trigger" onClick={toggle} style={{ display: 'flex' }}>
          <Menu className="header-icon" />
        </div>
        <div className="actions">
          {/* <Tooltip
            title={formatMessage({
              id: theme === 'dark' ? 'gloabal.tips.theme.lightTooltip' : 'gloabal.tips.theme.darkTooltip',
            })}
          >
            <span>
              {createElement(theme === 'dark' ? Sun : Moon, {
                className: 'header-icon',
                onClick: onChangeTheme,
              })}
            </span>
          </Tooltip> */}
          {logged && (
            <Badge count={noticeCount}>
              <Bell className="header-icon" onClick={() => showDrawer(true)} />
            </Badge>
          )}
          <Dropdown
            menu={{
              onClick: info => selectLocale(info),
              className: 'dropdown-menu',
              items: [
                {
                  key: 'vi_VN',
                  icon: <ViVNSvg />,
                  disabled: locale === 'vi_VN',
                  label: 'Tiếng Việt',
                },
                {
                  key: 'en_US',
                  icon: <EnUsSvg />,
                  disabled: locale === 'en_US',
                  label: 'English',
                },
              ],
            }}
          >
            <span>
              <Globe id="language-change" className="header-icon" />
            </span>
          </Dropdown>

          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: (
                      <span onClick={() => navigate('/dashboard')}>
                        <LocaleFormatter id="header.avator.account" />
                      </span>
                    ),
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined />,
                    label: (
                      <span onClick={() => onActionClick('logout')}>
                        <LocaleFormatter id="header.avator.logout" />
                      </span>
                    ),
                  },
                ],
              }}
            >
              {avatar ? (
                <Avatar src={<img src={avatar} />} size={'large'} />
              ) : (
                <Avatar size={40} className="bg-[#c3e9fa] border-[2px] border-solid border-[#007bff] text-[#007bff]">
                  {getInitial(displayName)}
                </Avatar>
              )}
            </Dropdown>
          ) : (
            <Tooltip
              title={formatMessage({
                id: 'gloabal.tips.login',
              })}
            >
              <span onClick={toLogin}>
                <LogIn className="header-icon" />
              </span>
            </Tooltip>
          )}
        </div>
      </div>
      <Drawer
        title={formatMessage({
          id: 'gloabal.tips.notification',
        })}
        placement={'right'}
        headerStyle={{ textAlign: 'center' }}
        width={device !== 'MOBILE' ? '500px' : '100%'}
        onClose={() => showDrawer(false)}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Header>
  );
};

export default HeaderComponent;
