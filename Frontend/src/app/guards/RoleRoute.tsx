import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import type { RootState } from '../store/store' 

type RoleRouteProps = {
  allowedRoles: string[]
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { user, isAuthenticated, isAuthChecked } = useSelector((state: RootState) => state.auth)

  if (!isAuthChecked) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }


  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }


  return <Outlet />
}

export default RoleRoute