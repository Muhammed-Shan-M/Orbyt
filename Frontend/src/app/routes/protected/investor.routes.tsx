import { Route } from 'react-router-dom';

import RoleRoute from '../../guards/RoleRoute';

import InvestorDashboardPage from '../../../modules/investor/Dashboard/pages/InvestorDashboardPage';

import { ROUTES } from '../../../shared/constants/routes';

export const investorRoutes = (
  <Route element={<RoleRoute allowedRoles={['investor']} />}>
    <Route
      path={ROUTES.INVESTOR.DASHBOARD}
      element={<InvestorDashboardPage />}
    />
  </Route>
);