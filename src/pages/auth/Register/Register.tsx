import { FC, useCallback, useMemo, useState } from 'react';
import './Register.scss';
import { Form, Input, Divider, Button, Space } from 'antd';
import AvatarSVG from '@/common/imgs/avatar.svg';

interface RegisterStep1Value {
  email: string;
  code: string;
}
interface RegisterStep2Value {
  username: string;
  password: string;
}

const Register: FC = () => {
  const [step, setStep] = useState(0);
  const [countDown, setCountDown] = useState(0);

  const getCode = useMemo(() => {
    let id: number;
    return () => {
      setCountDown(60);

      clearInterval(id);
      id = setInterval(() => {
        setCountDown((s) => s - 1);
      }, 1000);
    };
  }, []);

  const next = useCallback((value: RegisterStep1Value) => {
    console.log(value);
    setStep(1);
  }, []);

  const register = useCallback((value: RegisterStep2Value) => {
    console.log(value);
  }, []);

  return (
    <div className="register-page">
      <div>
        <img width="200" height="200" src={AvatarSVG} alt="" />
        <Divider />

        {step === 0 && (
          <Form onFinish={next}>
            <Form.Item name="email" rules={[{ required: true, message: '', type: 'email' }]} required={false}>
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Form.Item name="code" noStyle rules={[{ required: true, message: '', len: 6 }]} required={false}>
                  <Input placeholder="Code" />
                </Form.Item>
                <Button className="w-40" onClick={getCode} disabled={countDown > 0}>
                  {countDown > 0 ? `${countDown}s to retry` : 'Get code by email'}
                </Button>
              </Space>
            </Form.Item>

            <Divider />
            <Button htmlType="submit" type="primary" size="large" className="w-full">
              Continue
            </Button>
          </Form>
        )}

        {step === 1 && (
          <Form onFinish={register}>
            <Form.Item name="username" rules={[{ required: true, message: '' }]} required={false}>
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '' }]} required={false}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Divider />
            <Button htmlType="submit" type="primary" size="large" className="w-full">
              Register
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Register;
