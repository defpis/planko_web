import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const ErrorLayout: FC = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Outlet />
    </div>
  );
};

export default ErrorLayout;
