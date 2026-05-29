import React from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../../shared/layouts/AuthLayout'
import Button from '../../../shared/ui/Button'

const ResetSuccessPage: React.FC = () => {
  return (
    <AuthLayout>
      <div className="space-y-8 text-center">
        {/* Success icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-orbyt-emerald/10 border border-orbyt-emerald/20 flex items-center justify-center">
              <svg className="w-9 h-9 text-orbyt-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl blur-xl bg-orbyt-emerald/10 -z-10" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="font-display font-800 text-2xl text-orbyt-text tracking-tight">Password changed</h2>
          <p className="text-orbyt-muted text-sm font-body font-300 leading-relaxed">
            Your account security has been updated successfully. You can now sign in with your new password.
          </p>
        </div>

        {/* CTA */}
        <Link to="/login" className="block">
          <Button>
            Go to login
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </Link>

        {/* Security notice */}
        <div className="bg-orbyt-surface2 border border-orbyt-border rounded-lg px-4 py-3 text-left">
          <p className="text-[10px] font-display font-600 tracking-widest uppercase text-orbyt-muted mb-1">
            Security notice
          </p>
          <p className="text-orbyt-muted text-xs font-body font-300 leading-relaxed">
            Didn't make this change?{' '}
            <a href="mailto:security@orbyt.io" className="text-orbyt-emerald hover:underline">
              Contact our support team
            </a>{' '}
            immediately.
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ResetSuccessPage
