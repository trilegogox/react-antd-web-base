import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';
import { useLocale } from '@/locales';
import { RouteProps, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { Role } from '@/utils/enums';

export interface PrivateProps extends RouteProps {
  admin: boolean;
}

const PrivateRoute: FC<PrivateProps> = ({ admin, ...props }) => {
  const { logged, role } = useSelector(state => state.user);
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  const location = useLocation();
  const accessible = admin ? logged && role === Role.ADMIN : logged;

  return accessible ? (
    (props.element as React.ReactElement)
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage({ id: 'gloabal.tips.unauthorized' })}
      extra={
        <Button
          type="primary"
          onClick={() => navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })}
        >
          {formatMessage({ id: 'gloabal.tips.login' })}
        </Button>
      }
    />
  );
};

export default PrivateRoute;
