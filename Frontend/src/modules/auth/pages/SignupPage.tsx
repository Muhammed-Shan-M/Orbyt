import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../../shared/layouts/AuthLayout'
import Input from '../../../shared/ui/Input'
import Button from '../../../shared/ui/Button'
import type { Role } from '../types/formState'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, type SignupFormData, } from '../validator/sigupSchema'

import { useSignup } from '../hooks/useSigup'
import { useAuthPolling } from '../../../app/hooks/useAuthPolling'

const SignupPage: React.FC = () => {
  const [showVerificationPopup, setShowVerificationPopup] = useState(false)

  useAuthPolling(showVerificationPopup)

  const signupMutation = useSignup()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'founder',
    },
  })

  const selectedRole = watch('role')
  const emailValue = watch('email')

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signupMutation.mutateAsync(data)


      setShowVerificationPopup(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleSignup = async () => { }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="font-display font-800 text-2xl text-orbyt-text tracking-tight">
            Create account
          </h2>
          <p className="text-orbyt-muted text-sm font-body font-300">
            Join the Orbyt ecosystem today
          </p>
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 bg-orbyt-surface2 border border-orbyt-border
                     text-orbyt-text text-sm font-body rounded-lg py-3 px-4
                     hover:border-orbyt-border2 hover:bg-orbyt-surface3 transition-all duration-200 active:scale-[0.98]"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-orbyt-border" />
          <span className="text-orbyt-muted text-xs font-body">
            or sign up with email
          </span>
          <div className="flex-1 h-px bg-orbyt-border" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full name"
            type="text"
            placeholder="Alex Johnson"
            error={errors.fullName?.message}
            autoComplete="name"
            {...register('fullName')}
          />

          <Input
            label="Email address"
            type="email"
            placeholder="you@startup.com"
            error={errors.email?.message}
            autoComplete="email"
            {...register('email')}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              autoComplete="new-password"
              {...register('password')}
            />

            <Input
              label="Confirm"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
              {...register('confirmPassword')}
            />
          </div>

          <div>
            <label className="block text-[10px] font-display font-700 tracking-[0.15em] uppercase text-orbyt-muted mb-2">
              I am signing up as a
            </label>

            <div className="grid grid-cols-2 gap-3">
              {([
                {
                  role: 'founder' as Role,
                  label: 'Founder',
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  ),
                  desc: 'Building a startup',
                },
                {
                  role: 'investor' as Role,
                  label: 'Investor',
                  icon: (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  ),
                  desc: 'Deploying capital',
                },
              ]).map(({ role, label, icon, desc }) => {
                const selected = selectedRole === role

                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setValue('role', role)}
                    className={`
                      flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200
                      ${selected
                        ? 'border-orbyt-emerald bg-orbyt-emerald/8 text-orbyt-emerald'
                        : 'border-orbyt-border bg-orbyt-surface2 text-orbyt-muted hover:border-orbyt-border2 hover:text-orbyt-muted2'
                      }
                    `}
                  >
                    <div
                      className={`${selected
                          ? 'text-orbyt-emerald'
                          : 'text-orbyt-muted'
                        } transition-colors`}
                    >
                      {icon}
                    </div>

                    <div className="text-center">
                      <div
                        className={`font-display font-700 text-sm tracking-wide uppercase ${selected ? 'text-orbyt-emerald' : ''
                          }`}
                      >
                        {label}
                      </div>

                      <div
                        className={`text-[10px] mt-0.5 ${selected
                            ? 'text-orbyt-emerald/70'
                            : 'text-orbyt-muted'
                          }`}
                      >
                        {desc}
                      </div>
                    </div>

                    {selected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-orbyt-emerald flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-orbyt-bg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {errors.role && (
              <p className="mt-1.5 text-xs text-orbyt-red">
                {errors.role.message}
              </p>
            )}
          </div>

          <div className="pt-1">
            <Button
              type="submit"
              loading={signupMutation.isPending}
            >
              Create account
            </Button>
          </div>
        </form>

        <p className="text-center text-orbyt-muted text-sm font-body">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-orbyt-emerald hover:text-orbyt-emerald3 transition-colors font-500"
          >
            Sign in
          </Link>
        </p>
      </div>

      {showVerificationPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            background: 'rgba(7,8,12,0.85)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div className="bg-orbyt-surface border border-orbyt-border rounded-2xl p-8 w-full max-w-sm text-center space-y-5 animate-slide-up shadow-card">
            <div className="w-16 h-16 rounded-2xl bg-orbyt-emerald/10 border border-orbyt-emerald/20 flex items-center justify-center mx-auto">
              <svg
                className="w-7 h-7 text-orbyt-emerald"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-700 text-xl text-orbyt-text">
                Check your email
              </h3>

              <p className="text-orbyt-muted text-sm font-body font-300 leading-relaxed">
                We've sent a verification link to{' '}
                <span className="text-orbyt-text font-500">
                  {emailValue}
                </span>
                . Click the link to activate your account.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button className="w-full text-orbyt-muted text-xs font-body hover:text-orbyt-muted2 transition-colors py-2">
                Didn't receive it?{' '}
                <span className="text-orbyt-emerald">
                  Resend email
                </span>
              </button>

              <button
                className="w-full text-orbyt-muted text-xs font-body hover:text-orbyt-muted2 transition-colors py-2"
                onClick={() => setShowVerificationPopup(false)}
              >
                Back to sign up
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}

export default SignupPage