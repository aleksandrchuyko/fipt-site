import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authSelectors } from 'redux/auth';

export default function PrivateRoute({
  redirectTo = '/',
  component: Component,
}) {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isRefreshingUser = useSelector(authSelectors.getIsRefreshingUser);
  const shouldRedirect = !isLoggedIn && !isRefreshingUser;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
}
