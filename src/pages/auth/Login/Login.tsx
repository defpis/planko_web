import { FC, useCallback } from 'react';
import './Login.scss';
import { Form, Input, Divider, Button } from 'antd';
import AvatarSVG from '@/common/imgs/avatar.svg';

interface LoginValue {
  username: string;
  password: string;
}

const Login: FC = () => {
  const login = useCallback((value: LoginValue) => {
    console.log(value);
  }, []);

  return (
    <div className="login-page">
      <div>
        <img width="200" height="200" src={AvatarSVG} alt="" />
        <Divider />
        <Form onFinish={login}>
          <Form.Item name="username" rules={[{ required: true, message: '' }]} required={false}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '' }]} required={false}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Divider />
          <Button htmlType="submit" type="primary" size="large" className="w-full">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
