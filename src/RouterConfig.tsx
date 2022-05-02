import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import GroupsPage from './pages/GroupsPage';
import PageLayout from './pages/PageLayout';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import AccessControl from './pages/AccessControl';

const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="groups"
          element={
            <AccessControl>
              <GroupsPage />
            </AccessControl>
          }
        />
        <Route path="events" element={<EventsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RouterConfig;
