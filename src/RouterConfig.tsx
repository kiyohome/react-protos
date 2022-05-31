import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import GroupsPage from './pages/GroupsPage';
import PageLayout from './pages/PageLayout';
import NotFoundPage from './pages/NotFoundPage';
import WelcomePage from './pages/WelcomePage';
import AccessControl from './pages/AccessControl';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const RouterConfig = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageLayout />}>
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default RouterConfig;
