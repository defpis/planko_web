import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './WrapperContent.scss';

const WrapperContent: FC = () => {
  return (
    <div className="wrapper-content">
      <Outlet />
    </div>
  );
};

export default WrapperContent;
