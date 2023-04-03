import { FC, ReactElement } from 'react';
import { RouteProps } from 'react-router';
import PrivateRoute from './privateRoute';
import { useIntl } from 'react-intl';

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  titleId: string;
  /** authorization？ */
  auth?: boolean;
  admin?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, auth, admin, ...props }) => {
  const { formatMessage } = useIntl();

  if (titleId) {
    document.title = formatMessage({
      id: titleId,
    });
  }

  return auth || admin ? <PrivateRoute admin={admin || false} {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
