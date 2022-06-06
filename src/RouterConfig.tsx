import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import PageNotFoundPage from './pages/PageNotFoundPage';
import WelcomePage from './pages/WelcomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AccessControl from './pages/AccessControl';
import GroupsPage from './pages/GroupsPage';
import GroupPage from './pages/GroupPage';
import EventsPage from './pages/EventsPage';

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
        <Route path="groups/:groupId" element={<GroupPage />} />
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
