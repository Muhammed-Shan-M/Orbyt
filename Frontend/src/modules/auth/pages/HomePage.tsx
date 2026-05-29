import React from 'react'
import { Link } from 'react-router-dom'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-orbyt-bg text-orbyt-text font-body">

      <nav className="border-b border-orbyt-border"
        style={{ background: 'rgba(7,8,12,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orbyt-emerald flex items-center justify-center">
              <span className="font-display font-800 text-orbyt-bg text-xs">O</span>
            </div>
            <span className="font-display font-800 text-orbyt-text text-base tracking-tight">Orbyt</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-orbyt-surface border border-orbyt-border rounded-lg px-3 py-1.5">
              <div className="w-6 h-6 rounded-md bg-orbyt-emerald/15 flex items-center justify-center">
                <span className="font-display font-700 text-orbyt-emerald text-[10px]">U</span>
              </div>
              <span className="text-orbyt-text text-xs font-body">My Account</span>
              <svg className="w-3.5 h-3.5 text-orbyt-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orbyt-emerald/20 bg-orbyt-emerald/5">
            <span className="w-1.5 h-1.5 rounded-full bg-orbyt-emerald animate-pulse-soft" />
            <span className="text-orbyt-emerald text-xs font-display font-600 tracking-wider uppercase">Welcome to Orbyt</span>
          </div>
          <h1 className="font-display font-800 text-4xl md:text-5xl tracking-tight">
            Your dashboard is<br />
            <span className="text-orbyt-emerald">ready for you.</span>
          </h1>
          <p className="text-orbyt-muted font-body font-300 text-lg max-w-md mx-auto">
            Choose your path to get started in the Orbyt ecosystem.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link to="/founder/dashboard"
            className="group bg-orbyt-surface border border-orbyt-border rounded-2xl p-8 hover:border-orbyt-emerald/30 hover:bg-orbyt-surface2 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-orbyt-emerald/10 border border-orbyt-emerald/20 flex items-center justify-center mb-6 group-hover:bg-orbyt-emerald/15 transition-colors">
              <svg className="w-6 h-6 text-orbyt-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-display font-700 text-xl text-orbyt-text mb-2">Founder Dashboard</h3>
            <p className="text-orbyt-muted text-sm font-body font-300 leading-relaxed mb-6">
              Manage your startup profile, track investor views, and grow your funding pipeline.
            </p>
            <div className="flex items-center gap-2 text-orbyt-emerald text-sm font-display font-600">
              Go to dashboard
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>

          <Link to="/investor/dashboard"
            className="group bg-orbyt-surface border border-orbyt-border rounded-2xl p-8 hover:border-orbyt-emerald/30 hover:bg-orbyt-surface2 transition-all duration-200">
            <div className="w-12 h-12 rounded-xl bg-orbyt-emerald/10 border border-orbyt-emerald/20 flex items-center justify-center mb-6 group-hover:bg-orbyt-emerald/15 transition-colors">
              <svg className="w-6 h-6 text-orbyt-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-display font-700 text-xl text-orbyt-text mb-2">Investor Dashboard</h3>
            <p className="text-orbyt-muted text-sm font-body font-300 leading-relaxed mb-6">
              Discover startups, review AI-matched deals, and track your investment pipeline.
            </p>
            <div className="flex items-center gap-2 text-orbyt-emerald text-sm font-display font-600">
              Go to dashboard
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
