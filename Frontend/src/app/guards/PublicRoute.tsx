import { Navigate, Outlet } from 'react-router-dom'

import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'
import { getDashboardRouteByRole } from '../../shared/helper/roleRedirect'

const PublicRoute = () => {

    const { isAuthenticated, isAuthChecked, user } = useSelector((state: RootState) => state.auth)

    if (!isAuthChecked) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading...
            </div>
        )
    }

    if (isAuthenticated && user) {
        return (
            <Navigate to={getDashboardRouteByRole(user.role)} replace />
        )
    }
    

    return <Outlet />
}

export default PublicRoute