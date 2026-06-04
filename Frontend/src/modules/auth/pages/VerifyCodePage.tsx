import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../../shared/layouts/AuthLayout'
import Button from '../../../shared/ui/Button'
import { useVerifyForgotOtp } from '../hooks/useVerifyForgotOtp'
import { ROUTES } from '../../../shared/constants/routes'
import { useResendForgotOtp } from '../hooks/useResendForgotOtp'
import { useForgotPasswordCooldown } from '../hooks/useForgotPasswordCooldown'

const VerifyCodePage: React.FC = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const [timer, setTimer] = useState(0)
  // const [canResend, setCanResend] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const email = new URLSearchParams(location.search).get('email') || ''
  const { data: cooldownData } = useForgotPasswordCooldown(email)

  useEffect(() => {

    if (
      cooldownData?.remainingSeconds !==
      undefined
    ) {

      setTimer(
        cooldownData.remainingSeconds
      )

    }

  }, [cooldownData])


  useEffect(() => {

    if (timer <= 0) {
      return
    }

    const interval = setInterval(() => {

      setTimer(prev => prev - 1)

    }, 1000)

    return () => clearInterval(interval)

  }, [timer])

  const canResend = timer <= 0

  // useEffect(() => {

  //   if (timer <= 0) {

  //     setCanResend(true)

  //     return
  //   }

  //   const interval = setInterval(() => {

  //     setTimer((prev) => prev - 1)

  //   }, 1000)

  //   return () => clearInterval(interval)

  // }, [timer])

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const updated = [...code]
    updated[index] = value
    setCode(updated)
    setError('')
    if (value && index < 5) inputs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const updated = [...code]
    pasted.split('').forEach((char, i) => { updated[i] = char })
    setCode(updated)
    inputs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const { mutateAsync, isPending } = useVerifyForgotOtp()
  const { mutateAsync: resendOtp, isPending: isResendingOtp } = useResendForgotOtp()


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setError('')

    const otp = code.join('')

    if (otp.length !== 6) {

      setError('Please enter the complete 6-digit code')

      return
    }

    try {

      if (!email) {

        setError(
          'Email not found'
        )

        return
      }

      await mutateAsync({ email, otp })

      navigate(`${ROUTES.AUTH.FORGOT_PASSWORD_RESET}?email=${encodeURIComponent(email)}`)

    } catch (error: any) {

      setError(
        error?.response?.data?.message ||
        'Invalid verification code'
      )
    }
  }

  const handleResend = async () => {
    try {

      if (!email) {

        setError('Email not found')

        return
      }

      await resendOtp(email)

      setTimer(60)

      setCode(['', '', '', '', '', ''])

      setError('')

    } catch (error: any) {

      setError(
        error?.response?.data?.message ||
        'Failed to resend OTP'
      )

    }
  }

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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Header */}
        <div className="space-y-1.5">
          <h2 className="font-display font-800 text-2xl text-orbyt-text tracking-tight">Enter the code</h2>
          <p className="text-orbyt-muted text-sm font-body font-300 leading-relaxed">
            We've sent a 6-digit verification code to your email. Enter it below.
          </p>
        </div>

        {/* OTP inputs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex gap-2.5 justify-between" onPaste={handlePaste}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={`
                    w-12 h-14 text-center text-xl font-display font-700 rounded-lg border
                    bg-orbyt-surface2 text-orbyt-text transition-all duration-200
                    focus:outline-none focus:ring-1
                    ${error
                      ? 'border-orbyt-red/60 focus:border-orbyt-red focus:ring-orbyt-red/20'
                      : digit
                        ? 'border-orbyt-emerald bg-orbyt-emerald/5'
                        : 'border-orbyt-border focus:border-orbyt-emerald focus:ring-orbyt-emerald/20'}
                  `}
                />
              ))}
            </div>
            {error && (
              <p className="mt-2 text-xs text-orbyt-red text-center">{error}</p>
            )}
          </div>

          <Button type="submit" loading={isPending} disabled={code.some((c) => !c)}>
            Verify code
          </Button>
        </form>

        <p className="text-center text-sm font-body text-orbyt-muted">

          {!canResend ? (

            <span>
              Resend code in{' '}
              <span className="text-orbyt-emerald font-500">
                {timer}s
              </span>
            </span>

          ) : (

            <>
              Didn't receive a code?{' '}

              <button
                type="button"
                disabled={isResendingOtp || !canResend}
                onClick={handleResend}
                className="text-orbyt-emerald hover:text-orbyt-emerald3 transition-colors font-500"
              >
                {isResendingOtp
                  ? 'Sending...'
                  : 'Resend OTP'}
              </button>
            </>

          )}

        </p>
      </div>
    </AuthLayout>
  )
}

export default VerifyCodePage
