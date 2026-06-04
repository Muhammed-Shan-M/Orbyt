
import { Route } from 'react-router-dom';

import ProtectedRoute from '../guards/ProtectedRoute';

import { adminRoutes } from './protected/admin.routes';
import { founderRoutes } from './protected/founder.routes';
import { investorRoutes } from './protected/investor.routes';

export const protectedRoutes = (
  <Route element={<ProtectedRoute />}>
    {adminRoutes}
    {founderRoutes}
    {investorRoutes}
  </Route>
);