import { useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { setAuthChecked, setCredentials } from '../../modules/auth/store/auth.slice'
import { refreshToken } from '../../modules/auth/api/api.refresh-token'

export const useAuthInitializer = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await refreshToken()


                dispatch(
                    setCredentials({
                        user: response.user,
                        accessToken: response.accessToken,
                        isAuthenticated: true
                    })
                )
            } catch (error) {
                console.log(error)
            } finally {
                dispatch(setAuthChecked(true))
            }
        }

        initializeAuth()
    }, [])
}