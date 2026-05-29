import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthLayout from '../../../shared/layouts/AuthLayout'
import Button from '../../../shared/ui/Button'
import { useDispatch } from 'react-redux'

import { useVerifyEmail } from '../hooks/useverifyEmail'
import { setAuthChecked, setCredentials } from '../store/auth.slice'
import { getDashboardRouteByRole } from '../../../shared/helper/roleRedirect'

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate()
  const { token } = useParams()

  const verifyEmailMutation = useVerifyEmail()

  const dispatch = useDispatch()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!token) {
          return
        }

        const response = await verifyEmailMutation.mutateAsync(token)

        dispatch(
          setCredentials({
            user: response.user,
            accessToken: response.accessToken,
            isAuthenticated: true,
          })
        )

        navigate(getDashboardRouteByRole(response.user.role))

      } catch (error) {
        return
      } finally {
        setAuthChecked(true)
      }
    }

    verifyEmail()
  }, [token, navigate])


  return (
    <AuthLayout>
      <div className="space-y-8 text-center">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-orbyt-emerald/10 border border-orbyt-emerald/20 flex items-center justify-center">
            <svg
              className="w-9 h-9 text-orbyt-emerald"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display font-800 text-2xl text-orbyt-text tracking-tight">
            {verifyEmailMutation.isPending
              ? 'Verifying your email'
              : verifyEmailMutation.isSuccess
                ? 'Email verified'
                : 'Verification failed'}
          </h2>

          <p className="text-orbyt-muted text-sm font-body font-300 leading-relaxed">
            {verifyEmailMutation.isPending
              ? 'Please wait while we verify your account.'
              : verifyEmailMutation.isSuccess
                ? 'Your account has been successfully verified. Redirecting you to login.'
                : token
                  ? (
                    verifyEmailMutation.error as any
                  )?.response?.data?.message ||
                  'Verification failed'
                  : 'Invalid verification link'}
          </p>
        </div>

        {verifyEmailMutation.isPending && (
          <Button loading={true}>
            Verifying...
          </Button>
        )}

        {verifyEmailMutation.isSuccess && (
          <Button
            onClick={() => navigate('/login')}
          >
            Continue to login
          </Button>
        )}

        {!verifyEmailMutation.isPending &&
          !verifyEmailMutation.isSuccess && (
            <div className="space-y-4">
              <div className="bg-orbyt-red/10 border border-orbyt-red/30 rounded-lg px-4 py-3">
                <p className="text-orbyt-red text-sm">
                  {token
                    ? (
                      verifyEmailMutation.error as any
                    )?.response?.data
                      ?.message ||
                    'Verification failed'
                    : 'Invalid verification link'}
                </p>
              </div>

              <p className="text-orbyt-muted text-xs font-body">
                Link expired?{' '}
                <button className="text-orbyt-emerald hover:text-orbyt-emerald3 transition-colors">
                  Request a new one
                </button>
              </p>
            </div>
          )}
      </div>
    </AuthLayout>
  )
}

export default VerifyEmailPage