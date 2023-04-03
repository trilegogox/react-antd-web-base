import { viVN_account } from './account';
import { viVN_avatorDropMenu } from './user/avatorDropMenu';
import { viVN_tagsViewDropMenu } from './user/tagsViewDropMenu';
import { viVN_title } from './user/title';
import { viVN_globalTips } from './global/tips';
import { viVN_permissionRole } from './permission/role';
import { viVN_dashboard } from './dashboard';
import { viVN_guide } from './guide';
import { viVN_documentation } from './documentation';
import { viVN_notice } from './notice';
import { viVN_component } from './component';
import { viVN_menu } from './user/menuItem';
import { viVN_login } from './login';

const vi_VN = {
  ...viVN_account,
  ...viVN_avatorDropMenu,
  ...viVN_tagsViewDropMenu,
  ...viVN_title,
  ...viVN_login,
  ...viVN_menu,
  ...viVN_globalTips,
  ...viVN_permissionRole,
  ...viVN_dashboard,
  ...viVN_guide,
  ...viVN_documentation,
  ...viVN_notice,
  ...viVN_component,
};

export default vi_VN;
