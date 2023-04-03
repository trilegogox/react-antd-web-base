import { MenuList } from '@/interface/layout/menu.interface';
import { mock, intercepter } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'dashboard',
    label: {
      vi_VN: '首页',
      en_US: 'Dashboard',
    },
    icon: 'dashboard',
    path: '/dashboard',
  },
  {
    code: 'documentation',
    label: {
      vi_VN: '文档',
      en_US: 'Documentation',
    },
    icon: 'documentation',
    path: '/documentation',
  },
  {
    code: 'guide',
    label: {
      vi_VN: '引导',
      en_US: 'Guide',
    },
    icon: 'guide',
    path: '/guide',
  },
  {
    code: 'permission',
    label: {
      vi_VN: '权限',
      en_US: 'Permission',
    },
    icon: 'permission',
    path: '/permission',
    children: [
      {
        code: 'routePermission',
        label: {
          vi_VN: '路由权限',
          en_US: 'Route Permission',
        },
        path: '/permission/route',
      },
      {
        code: 'notFound',
        label: {
          vi_VN: '404',
          en_US: '404',
        },
        path: '/permission/404',
      },
    ],
  },
  {
    code: 'component',
    label: {
      vi_VN: '组件',
      en_US: 'Component',
    },
    icon: 'permission',
    path: '/component',
    children: [
      {
        code: 'componentForm',
        label: {
          vi_VN: '表单',
          en_US: 'Form',
        },
        path: '/component/form',
      },
      {
        code: 'componentTable',
        label: {
          vi_VN: '表格',
          en_US: 'Table',
        },
        path: '/component/table',
      },
      {
        code: 'componentSearch',
        label: {
          vi_VN: '查询',
          en_US: 'Search',
        },
        path: '/component/search',
      },
      {
        code: 'componentAside',
        label: {
          vi_VN: '侧边栏',
          en_US: 'Aside',
        },
        path: '/component/aside',
      },
      {
        code: 'componentTabs',
        label: {
          vi_VN: '选项卡',
          en_US: 'Tabs',
        },
        path: '/component/tabs',
      },
      {
        code: 'componentRadioCards',
        label: {
          vi_VN: '单选卡片',
          en_US: 'Radio Cards',
        },
        path: '/component/radio-cards',
      },
    ],
  },

  {
    code: 'business',
    label: {
      vi_VN: '业务',
      en_US: 'Business',
    },
    icon: 'permission',
    path: '/business',
    children: [
      {
        code: 'basic',
        label: {
          vi_VN: '基本',
          en_US: 'Basic',
        },
        path: '/business/basic',
      },
      {
        code: 'withSearch',
        label: {
          vi_VN: '带查询',
          en_US: 'WithSearch',
        },
        path: '/business/with-search',
      },
      {
        code: 'withAside',
        label: {
          vi_VN: '带侧边栏',
          en_US: 'WithAside',
        },
        path: '/business/with-aside',
      },
      {
        code: 'withRadioCard',
        label: {
          vi_VN: '带单选卡片',
          en_US: 'With Nav Tabs',
        },
        path: '/business/with-radio-cards',
      },
      {
        code: 'withTabs',
        label: {
          vi_VN: '带选项卡',
          en_US: 'With Tabs',
        },
        path: '/business/with-tabs',
      },
    ],
  },
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
