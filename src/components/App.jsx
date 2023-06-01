import { Box } from './Box';
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from 'components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';
import { useEffect } from 'react';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
const RegisterView = lazy(() => import('pages/RegisterView'));
const LoginView = lazy(() => import('pages/LoginView'));
const UsersView = lazy(() => import('pages/UsersView'));

export const App = () => {
  const isRefreshingUser = useSelector(authSelectors.getIsRefreshingUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    <Box
      as="main"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!isRefreshingUser && (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PublicRoute
                  restricted
                  redirectTo="/users"
                  component={<RegisterView />}
                />
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute
                  restricted
                  redirectTo="/users"
                  component={<RegisterView />}
                />
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute
                  restricted
                  redirectTo="/users"
                  component={<LoginView />}
                />
              }
            />
            <Route
              path="users"
              element={
                <PrivateRoute redirectTo="/login" component={<UsersView />} />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      )}
      <ToastContainer />
    </Box>
  );
};
