import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthLayout from '../../../shared/layouts/AuthLayout'
import Input from '../../../shared/ui/Input'
import Button from '../../../shared/ui/Button'

import { forgotPasswordSchema } from '../validator/forgotPassword.schema'
import { useForgotPassword } from '../hooks/useForgotPassword'

import { ROUTES } from '../../../shared/constants/routes'

const ForgotPasswordPage: React.FC = () => {

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { mutateAsync, isPending } = useForgotPassword()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setError('')

    const validatedFields = forgotPasswordSchema.safeParse({ email })

    if (!validatedFields.success) {

      setError(
        validatedFields.error.issues[0].message
      )

      return
    }

    try {

      await mutateAsync({ email })

      navigate(
        `${ROUTES.auth.FORGOT_PASSWORD_VERIFY}?email=${encodeURIComponent(email)}`
      )

    } catch (error: any) {

      setError(
        error?.response?.data?.message ||
        'Something went wrong'
      )
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-7">

        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-orbyt-muted text-sm font-body hover:text-orbyt-text transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>

          Back to login
        </Link>

        <div className="w-14 h-14 rounded-xl bg-orbyt-emerald/10 border border-orbyt-emerald/20 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-orbyt-emerald"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            />
          </svg>
        </div>


        <div className="space-y-1.5">
          <h2 className="font-display font-800 text-2xl text-orbyt-text tracking-tight">
            Reset password
          </h2>

          <p className="text-orbyt-muted text-sm font-body font-300 leading-relaxed">
            Enter your email and we'll send you a verification code to reset your password.
          </p>
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
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError('')
            }}
            error={error}
            autoComplete="email"
          />

          <div className="pt-1">
            <Button
              type="submit"
              loading={isPending}
            >
              Send verification code
            </Button>
          </div>
        </form>

        <p className="text-center text-orbyt-muted text-sm font-body">
          Remember your password?{' '}

          <Link
            to="/login"
            className="text-orbyt-emerald hover:text-orbyt-emerald3 transition-colors font-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default ForgotPasswordPage