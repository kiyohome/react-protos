import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/GlobalState';

type Props = {
  children: ReactNode;
};

const AccessControl = ({ children }: Props) => {
  const location = useLocation();
  const [user] = useUser();
  return user.isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default AccessControl;
