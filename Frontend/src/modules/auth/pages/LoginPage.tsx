import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthLayout from '../../../shared/layouts/AuthLayout'
import Input from '../../../shared/ui/Input'
import Button from '../../../shared/ui/Button'

import { loginSchema } from '../validator/loginSchema'

import type { LoginFormData } from '../validator/loginSchema'

import { useLogin } from '../hooks/useLogin'

import { useAppDispatch } from '../../../app/store/hook'

import { setCredentials, setAuthChecked } from '../store/auth.slice'
import { getDashboardRouteByRole } from '../../../shared/helper/roleRedirect'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { mutateAsync, isPending } = useLogin()

  const [form, setForm] = useState<LoginFormData>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })

    setErrors({
      ...errors,
      [e.target.name]: undefined,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = loginSchema.safeParse(form)

    if (!result.success) {
      const fieldErrors =
        result.error.flatten().fieldErrors

      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      })

      return
    }

    try {
      const response = await mutateAsync(form)

      dispatch(
        setCredentials({
          user: response.user,
          accessToken: response.accessToken,
          isAuthenticated: true,
        })
      )

      navigate(getDashboardRouteByRole(response.user.role))
    } catch (error) {
      console.error(error,"from login page")
      return 
    } finally {
      dispatch(setAuthChecked(true))
    }
  }

  const handleGoogleLogin = async () => {
    // TODO: connect Google OAuth
  }

  return (
    <AuthLayout>
      <div className="space-y-7">
        {/* Header */}
        <div className="space-y-1.5">
          <h2 className="font-display font-800 text-2xl text-orbyt-text tracking-tight">
            Welcome back
          </h2>

          <p className="text-orbyt-muted text-sm font-body font-300">
            Sign in to your Orbyt account
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-orbyt-surface2 border border-orbyt-border
                     text-orbyt-text text-sm font-body rounded-lg py-3 px-4
                     hover:border-orbyt-border2 hover:bg-orbyt-surface3 transition-all duration-200 active:scale-[0.98]"
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />

            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />

            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />

            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>

          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-orbyt-border" />

          <span className="text-orbyt-muted text-xs font-body">
            or continue with email
          </span>

          <div className="flex-1 h-px bg-orbyt-border" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Email address"
            name="email"
            type="email"
            placeholder="you@startup.com"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            autoComplete="email"
          />

          <div className="space-y-1.5">
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="current-password"
            />

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-orbyt-muted hover:text-orbyt-emerald transition-colors font-body"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="pt-1">
            <Button
              type="submit"
              loading={isPending}
            >
              Sign in
            </Button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-orbyt-muted text-sm font-body">
          Don't have an account?{' '}

          <Link
            to="/signup"
            className="text-orbyt-emerald hover:text-orbyt-emerald3 transition-colors font-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default LoginPage