import { Device } from '@/interface/layout/index.interface';
import { MenuChild } from '@/interface/layout/menu.interface';
import { Role } from './login';

export type Locale = 'vi_VN' | 'en_US';

export interface UserState {
  userId: string;

  username: string;

  displayName: string;

  /** menu list for init tagsView */
  menuList: MenuChild[];

  /** login status */
  logged: boolean;

  role: Role;

  avatar: string;

  /** user's device */
  device: Device;

  /** menu collapsed status */
  collapsed: boolean;

  /** notification count */
  noticeCount: number;

  /** user's language */
  locale: Locale;

  /** Is first time to view the site ? */
  newUser: boolean;
}
