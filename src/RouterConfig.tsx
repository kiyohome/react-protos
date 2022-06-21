import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AccessControl from './pages/AccessControl';
import AppLayout from './pages/AppLayout';
import EventsPage from './pages/events/EventsPage';
import GroupsPage from './pages/groups/GroupsPage';
import PageNotFoundPage from './pages/PageNotFoundPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';

const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route
          path="groups"
          element={
            <AccessControl>
              <GroupsPage />
            </AccessControl>
          }
        />
        <Route
          path="events"
          element={
            <AccessControl>
              <EventsPage />
            </AccessControl>
          }
        />
        <Route path="*" element={<PageNotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RouterConfig;
