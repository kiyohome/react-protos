import { Location, useLocation } from 'react-router-dom';

type LocationState = {
  state: {
    from: Location;
  };
};

type NavigateState = {
  fromPath: string | undefined;
};

const useNavigateState = (): NavigateState => {
  const location = useLocation() as LocationState;
  return { fromPath: location.state?.from?.pathname };
};

export default useNavigateState;
