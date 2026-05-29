import React from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-orbyt-bg flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(160deg, #0D1410 0%, #07080C 60%, #0A1410 100%)' }}>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#00C896 1px, transparent 1px), linear-gradient(90deg, #00C896 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />

        {/* Glow orb */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)' }} />

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="w-8 h-8 rounded-lg bg-orbyt-emerald flex items-center justify-center">
              <span className="font-display font-800 text-orbyt-bg text-sm">O</span>
            </div>
            <span className="font-display font-800 text-orbyt-text text-lg tracking-tight">Orbyt</span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orbyt-emerald/20 bg-orbyt-emerald/5">
              <span className="w-1.5 h-1.5 rounded-full bg-orbyt-emerald animate-pulse-soft" />
              <span className="text-orbyt-emerald text-xs font-display font-600 tracking-wider uppercase">AI-Powered Ecosystem</span>
            </div>
            <h1 className="font-display font-800 text-4xl text-orbyt-text leading-[1.1] tracking-tight">
              Where startups<br />
              find their<br />
              <span className="text-orbyt-emerald">orbit.</span>
            </h1>
            <p className="text-orbyt-muted font-body font-300 text-base leading-relaxed max-w-sm">
              Connect with the right investors, build credibility, and grow inside a curated startup ecosystem.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: '2,400+', label: 'Startups' },
              { val: '$180M+', label: 'Deployed' },
              { val: '860+', label: 'Investors' },
            ].map((s) => (
              <div key={s.label} className="bg-orbyt-surface/50 border border-orbyt-border rounded-xl p-4">
                <div className="font-display font-800 text-xl text-orbyt-emerald">{s.val}</div>
                <div className="text-orbyt-muted text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <p className="text-orbyt-muted text-xs font-body font-300 leading-relaxed">
            "Orbyt surfaced three investors we never would've found cold.<br />Closed our seed round 40% faster."
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-6 h-6 rounded-md bg-orbyt-emerald/15 flex items-center justify-center">
              <span className="font-display font-700 text-orbyt-emerald text-[10px]">SK</span>
            </div>
            <div>
              <div className="text-orbyt-text text-xs font-display font-600">Sarah Kim</div>
              <div className="text-orbyt-muted text-[10px]">Founder, Lumis Health</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-16 relative">
        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-orbyt-emerald flex items-center justify-center">
              <span className="font-display font-800 text-orbyt-bg text-xs">O</span>
            </div>
            <span className="font-display font-800 text-orbyt-text text-base">Orbyt</span>
          </Link>
        </div>

        <div className="w-full max-w-[400px] animate-slide-up">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
