import { FC } from 'react';
import { Button, Card, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import './index.less';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginParams } from '@/interface/user/login';
import { googleLoginAsync, loginAsync } from '@/stores/user.store';
import { useDispatch } from 'react-redux';
import { formatSearch } from '@/utils/formatSearch';
import { useLocale } from '@/locales';
import { Lock, Mail, Unlock, User } from 'react-feather';
import GoogleIcon from '@/assets/logo/google.svg';

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const onFinished = async (form: LoginParams) => {
    const res = await dispatch(loginAsync(form));

    if (!!res) {
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/dashboard' };

      navigate(from);
    }
  };

  const onGoogleLogin = async () => {
    const res = await dispatch(googleLoginAsync(true));

    if (!!res) {
      const search = formatSearch(location.search);
      const from = search.from || { pathname: '/dashboard' };

      navigate(from);
    }
  };

  return (
    <div className="flex w-full h-screen bg-[#f0f2f5] items-center justify-center">
      <Card className="w-full md:w-1/3 xl:w-1/4 border-[#ccc] shadow-lg">
        <Row>
          <Col span={24}>
            <a
              href="/"
              className="absolute logo-circle"
              style={{
                top: '-95px',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <User color="yellow" size={100} />
            </a>
            <span className="absolute half-circle" style={{ top: '-25px' }} />
          </Col>
        </Row>
        <Row style={{ justifyContent: 'center', marginTop: '35px' }}>
          <Col>
            <h2>
              {formatMessage({
                id: 'login.title',
              })}
            </h2>
          </Col>
        </Row>
        <Form<LoginParams>
          name="normal_login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinished}
        >
          <Form.Item
            label={formatMessage({
              id: 'login.form.email',
            })}
            name="username"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'login.form.email.required',
                }),
              },
            ]}
          >
            <Input
              prefix={<Mail className="inner-icon" />}
              placeholder={formatMessage({
                id: 'login.form.email',
              })}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label={formatMessage({
              id: 'login.form.password',
            })}
            name="password"
            rules={[
              {
                required: true,
                message: formatMessage({
                  id: 'login.form.password.required',
                }),
              },
            ]}
          >
            <Input
              prefix={<Lock className="inner-icon" />}
              type="password"
              placeholder={formatMessage({
                id: 'login.form.password',
              })}
              size="large"
            />
          </Form.Item>
          <Form.Item style={{ marginTop: '40px' }}>
            <Row>
              <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>
                    {formatMessage({
                      id: 'login.form.remember',
                    })}
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  icon={<Unlock size={16} />}
                  size="large"
                  htmlType="submit"
                  className="login-page-form-button"
                >
                  <span>
                    {formatMessage({
                      id: 'login.form.button',
                    })}
                  </span>
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Divider>
            {formatMessage({
              id: 'login.form.newway',
            })}
          </Divider>
        </Form>
        <Row style={{ justifyContent: 'center' }}>
          <Col>
            <img onClick={onGoogleLogin} src={GoogleIcon} style={{ cursor: 'pointer', width: '35px' }} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginForm;
