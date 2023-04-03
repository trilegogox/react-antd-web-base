import { MenuList } from '@/interface/layout/menu.interface';
import { Role } from '../utils/enums';
import { Chrome, Database, Lock, PieChart, Target, Users } from 'react-feather';

export const getMenuList = (role: string): MenuList => {
  const iconSize = 18;

  return [
    {
      code: 'dashboard',
      label: 'Dashboard',
      icon: <PieChart size={iconSize} />,
      path: '/dashboard',
    },
    {
      code: 'resource',
      label: 'Humen Resource',
      icon: <Users size={iconSize} />,
      path: '/documentation',
    },
    {
      code: 'task',
      label: 'Tasks',
      icon: <Target size={iconSize} />,
      path: '/guide',
    },
    {
      code: 'component',
      label: 'Component',
      icon: <Database size={iconSize} />,
      path: '/component',
      children: [
        {
          code: 'component.form',
          label: 'Form',
          path: '/component/form',
        },
        {
          code: 'component.table',
          label: 'Table',
          path: '/component/table',
        },
        {
          code: 'component.search',
          label: 'Search',
          path: '/component/search',
        },
      ],
    },

    {
      code: 'business',
      label: 'Business',
      icon: <Chrome size={iconSize} />,
      path: '/business',
      children: [
        {
          code: 'business.basic',
          label: 'Basic',
          path: '/business/basic',
        },
        {
          code: 'business.withSearch',
          label: 'WithSearch',
          path: '/business/with-search',
        },
        {
          code: 'business.withAside',
          label: 'WithAside',
          path: '/business/with-aside',
        },
      ],
    },
    ...(role === Role.ADMIN
      ? [
          {
            code: 'permission',
            label: 'Permission',
            icon: <Lock size={iconSize} />,
            path: '/permission',
            children: [
              {
                code: 'permission.route',
                label: 'Route Permission',
                path: '/permission/route',
              },
              {
                code: 'permission.404',
                label: '404',
                path: '/permission/404',
              },
            ],
          },
        ]
      : []),
  ];
};

export default getMenuList;
