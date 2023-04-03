import {
  QuestionOutlined,
  DashboardOutlined,
  SmileOutlined,
  FormOutlined,
  TabletOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  UserOutlined,
  HighlightOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { FC } from 'react';

interface DynamicIconProps {
  type: string;
  size?: string;
  color?: string;
}

export const DynamicIcon: FC<DynamicIconProps> = (props: DynamicIconProps) => {
  const styles = { fontSize: props.size, color: props.color };
  const Icons = {
    QuestionOutlined: <QuestionOutlined style={styles} />,
    DashboardOutlined: <DashboardOutlined style={styles} />,
    SmileOutlined: <SmileOutlined style={styles} />,
    FormOutlined: <FormOutlined style={styles} />,
    TabletOutlined: <TabletOutlined style={styles} />,
    ProfileOutlined: <ProfileOutlined style={styles} />,
    CheckCircleOutlined: <CheckCircleOutlined style={styles} />,
    WarningOutlined: <WarningOutlined style={styles} />,
    UserOutlined: <UserOutlined style={styles} />,
    HighlightOutlined: <HighlightOutlined style={styles} />,
    TableOutlined: <TableOutlined style={styles} />,
  };

  const getIcon = () => {
    // Default Icon when not found
    let comp = <QuestionOutlined style={styles} />;

    let typeNew = props.type;

    // Default is Outlined when no theme was appended (ex: 'smile')
    if (!typeNew.match(/.+(Outlined|Filled|TwoTone)$/i)) {
      typeNew += 'Outlined';
    }

    // If found by key then return value which is component
    const found = Object.entries(Icons).find(([k]) => k.toLowerCase() === typeNew.toLowerCase());

    if (found) {
      [, comp] = found;
    }

    return comp;
  };

  return getIcon();
};

export default DynamicIcon;
