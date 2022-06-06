import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

type Props = {
  children: ReactNode;
};

const AccessControl = ({ children }: Props) => {
  const location = useLocation();
  const auth = useAuth();
  return auth.isSignedIn ? (
    <>{children}</>
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default AccessControl;
