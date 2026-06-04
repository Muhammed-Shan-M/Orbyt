
import { Route } from 'react-router-dom';

import PublicRoute from '../guards/PublicRoute';

import { authRoutes } from './public/auth.routes';
import { adminAuthRoutes } from './public/admin-auth.routes';
import { landingRoutes } from './public/landing.routes';

export const publicRoutes = (
    <>
        <Route element={<PublicRoute />}>
            {authRoutes}
            {adminAuthRoutes}
            {landingRoutes}
        </Route>

    </>
);