import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../../shared/layouts/AuthLayout'
import Input from '../../../shared/ui/Input'
import Button from '../../../shared/ui/Button'
import { useResetPassword } from '../hooks/useResetPassword'
import { ROUTES } from '../../../shared/constants/routes'
import { resetPasswordSchema } from '../validator/resetPassword.schema'

const ResetPasswordPage: React.FC = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})
  const navigate = useNavigate()
  const { mutateAsync, isPending } = useResetPassword()
  const location = useLocation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validatedFields = resetPasswordSchema.safeParse(form)

    if (!validatedFields.success) {

      const fieldErrors = validatedFields.error.flatten().fieldErrors

      setErrors({
        password: fieldErrors.password?.[0],
        confirmPassword:
          fieldErrors.confirmPassword?.[0],
      })

      return
    }

    try {

      const email = new URLSearchParams(location.search).get('email')

      if (!email) {
        return
      }

      await mutateAsync({
        email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      })

      navigate(
        ROUTES.AUTH.FORGOT_PASSWORD_SUCCESS
      )

    } catch (error: any) {

      setErrors({
        password:
          error?.response?.data?.message ||
          'Something went wrong',
      })
    }
  }

  const getStrength = (pw: string) => {
    if (!pw) return { level: 0, label: '', color: '' }
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    const levels = [
      { level: 1, label: 'Weak', color: 'bg-orbyt-red' },
      { level: 2, label: 'Fair', color: 'bg-orbyt-amber' },
      { level: 3, label: 'Good', color: 'bg-orbyt-emerald/70' },
      { level: 4, label: 'Strong', color: 'bg-orbyt-emerald' },
    ]
    return levels[score - 1] || { level: 0, label: '', color: '' }
  }

  const strength = getStrength(form.password)

  return (
    <AuthLayout>
      <div className="space-y-7">
        {/* Back */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-orbyt-muted text-sm font-body hover:text-orbyt-text transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to login
        </Link>

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-orbyt-emerald/10 border border-orbyt-emerald/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-orbyt-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        {/* Header */}
        <div className="space-y-1.5">
          <h2 className="font-display font-800 text-2xl text-orbyt-text tracking-tight">New password</h2>
          <p className="text-orbyt-muted text-sm font-body font-300">
            Create a strong password for your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              label="New password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />
            {/* Strength indicator */}
            {form.password && (
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.level ? strength.color : 'bg-orbyt-border'
                        }`}
                    />
                  ))}
                </div>
                {strength.label && (
                  <p className="text-xs text-orbyt-muted">
                    Password strength: <span className="text-orbyt-text font-500">{strength.label}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          <Input
            label="Confirm new password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <div className="pt-1">
            <Button type="submit" loading={isPending}>
              Update password
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ResetPasswordPage
