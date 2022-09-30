import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

const InternalServerError: FC = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link to="/home">
          <Button type="primary">Back Home</Button>
        </Link>
      }
    />
  );
};

export default InternalServerError;
