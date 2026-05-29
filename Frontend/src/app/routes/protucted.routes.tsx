import { Route } from 'react-router-dom'

import ProtectedRoute from '../guards/ProtectedRoute'

// import HomePage from '../../modules/auth/pages/HomePage'
import FounderDashboardPage from '../../modules/founders/Dashbord/pages/FounderDashboardPage'
// import FounderDashboardPage from '../../modules/investor/Dashboard/pages/InvestorDashboardPage'



import { ROUTES } from '../../shared/constants/routes'
import RoleRoute from '../guards/RoleRoute'
import InvestorDashboardPage from '../../modules/investor/Dashboard/pages/InvestorDashboardPage'



export const protectedRoutes = (
  <Route element={<ProtectedRoute />}>

    <Route element={<RoleRoute allowedRoles={['founder']} />}>
      <Route
        path={ROUTES.FOUNDER.DASHBOARD}
        element={<FounderDashboardPage />}
      />
    </Route>

    <Route element={<RoleRoute allowedRoles={['investor']} />}>
      <Route
        path={ROUTES.INVESTOR.DASHBOARD}
        element={<InvestorDashboardPage />}
      />
    </Route>

  </Route>
)


