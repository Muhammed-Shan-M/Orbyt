import { Route } from 'react-router-dom';

import LandingPage from '../../../modules/auth/pages/LandingPage';

import { ROUTES } from '../../../shared/constants/routes';

export const landingRoutes = (
  <>
    <Route
      path={ROUTES.PUBLIC.LANDING}
      element={<LandingPage />}
    />
  </>
);