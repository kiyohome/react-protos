import { Location, useLocation } from 'react-router-dom';

type NavigateState = {
  state: {
    from: Location;
  };
};

const useNavigateState = () => {
  const location = useLocation();
  return { from: location };
};

export { useNavigateState };

export type { NavigateState };
