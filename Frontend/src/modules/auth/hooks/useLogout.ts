// modules/auth/hooks/useLogout.ts

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '../store/auth.slice'
import { logoutApi } from '../api/api.logout'

import { ROUTES } from '../../../shared/constants/routes'

export const useLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutApi()

            dispatch(logout())

            navigate(ROUTES.PUBLIC.LANDING)
        } catch (error) {
            console.log(error)
        }
    }

    return handleLogout
}