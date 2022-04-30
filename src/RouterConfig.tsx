import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Events from './pages/Events';
import Groups from './pages/Groups';
import NotFound from './pages/NotFound';
import Welcome from './pages/Welcome';

const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Welcome />} />
        <Route path="groups" element={<Groups />} />
        <Route path="events" element={<Events />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RouterConfig;
