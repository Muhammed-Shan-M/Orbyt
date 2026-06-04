import { Route } from 'react-router-dom';

import RoleRoute from '../../guards/RoleRoute';

import AdminDashboardPage from '../../../modules/admin/pages/dahsbord'
import UserManagementPage from '@/modules/admin/pages/UserManagementPage';
// import UserDetailsPage from '../../../modules/admin/pages/UserDetailsPage';

import { ROUTES } from '../../../shared/constants/routes';

export const adminRoutes = (
  <Route element={<RoleRoute allowedRoles={['admin']} />}>
    <Route
      path={ROUTES.ADMIN.DASHBOARD}
      element={<AdminDashboardPage />}
    />

    <Route
      path={ROUTES.ADMIN.USERS}
      element={<UserManagementPage />}
    />

    {/* <Route
      path={ROUTES.ADMIN.USER_DETAILS}
      element={<UserDetailsPage />}
    /> */}
  </Route>
);