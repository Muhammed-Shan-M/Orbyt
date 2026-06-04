import { Route } from 'react-router-dom';

import RoleRoute from '../../guards/RoleRoute';

import FounderDashboardPage from '../../../modules/founders/Dashbord/pages/FounderDashboardPage';

import { ROUTES } from '../../../shared/constants/routes';

export const founderRoutes = (
  <Route element={<RoleRoute allowedRoles={['founder']} />}>
    <Route
      path={ROUTES.FOUNDER.DASHBOARD}
      element={<FounderDashboardPage />}
    />
  </Route>
);