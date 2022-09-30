import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './common/layouts/MainLayout/MainLayout';
import WrapperContent from './common/layouts/WrapperContent/WrapperContent';
import Home from './pages/main/Home';
import About from './pages/main/About';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import ErrorLayout from './common/layouts/ErrorLayout';
import NotFound from './pages/error/NotFound';
import Forbidden from './pages/error/Forbidden';
import InternalServerError from './pages/error/InternalServerError';
import StickyNote from './pages/main/StickyNote/StickyNote';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainLayout />}>
          <Route index element={<Navigate to="/home" replace />} />

          <Route path="" element={<WrapperContent />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
          </Route>

          <Route path="sticky-note" element={<StickyNote />} />
        </Route>

        <Route path="auth">
          <Route index element={<Navigate state={{ from: location.pathname }} to="/error/404" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="error" element={<ErrorLayout />}>
          <Route index element={<Navigate state={{ from: location.pathname }} to="/error/404" replace />} />
          <Route path="404" element={<NotFound />} />
          <Route path="403" element={<Forbidden />} />
          <Route path="500" element={<InternalServerError />} />
        </Route>

        <Route path="*" element={<Navigate state={{ from: location.pathname }} to="/error/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
