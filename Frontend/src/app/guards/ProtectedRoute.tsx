import {Navigate,Outlet} from 'react-router-dom'

import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'


const ProtectedRoute = () => {
  const {isAuthenticated,isAuthChecked} = useSelector((state:RootState ) => state.auth)

  if (!isAuthChecked) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace />
    )
  }

  return <Outlet />
}

export default ProtectedRoute