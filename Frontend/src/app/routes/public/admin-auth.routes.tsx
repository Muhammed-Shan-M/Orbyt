import { Route } from 'react-router-dom';

import AdminLoginPage from '../../../modules/auth/pages/adminLoginPage'; 

import { ROUTES } from '../../../shared/constants/routes';

export const adminAuthRoutes = (
  <>
    <Route
      path={ROUTES.ADMIN.LOGIN}
      element={<AdminLoginPage />}
    />
  </>
);