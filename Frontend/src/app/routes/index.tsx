

import React from 'react'

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import { publicRoutes } from './public.routes'


import { protectedRoutes } from './protucted.routes'
import { useAuthInitializer } from '../hooks/useAuthInitializer'

const AppRoutes: React.FC = () => {
   useAuthInitializer()

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}

        {protectedRoutes}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
