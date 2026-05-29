import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../app/store/store' // adjust to your store path
import NotificationDropdown from './NotificationDropdown' 
import ProfileDropdown from './ProfileDropdown' 

interface NavLink {
  label: string
  path: string
  badge?: number
}

const investorLinks: NavLink[] = [
  { label: 'Dashboard', path: '/investor/dashboard' },
  { label: 'Matches', path: '/investor/matches', badge: 3 },
  { label: 'Discovery', path: '/investor/discovery' },
  { label: 'Community', path: '/investor/community' },
]

const founderLinks: NavLink[] = [
  { label: 'Dashboard', path: '/founder/dashboard' },
  { label: 'Opportunities', path: '/founder/opportunities' },
  { label: 'Discovery', path: '/founder/discovery' },
  { label: 'Community', path: '/founder/community' },
]

const Navbar: React.FC = () => {
  const location = useLocation()
  const { user } = useSelector((state: RootState) => state.auth)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const isInvestor = user?.role === 'investor'
  const navLinks = isInvestor ? investorLinks : founderLinks

  const closeAll = () => {
    setShowNotifications(false)
    setShowProfile(false)
  }

  return (
    <nav
      className="border-b border-orbyt-border sticky top-0 z-50"
      style={{ background: 'rgba(7,8,12,0.97)', backdropFilter: 'blur(20px)' }}
    >
      <div className="w-full max-w-[1700px] mx-auto px-6 h-[60px] flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-orbyt-emerald flex items-center justify-center">
            <span className="font-display font-800 text-orbyt-bg text-xs">O</span>
          </div>
          <span className="font-display font-800 text-orbyt-text text-base tracking-tight">Orbyt</span>
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-display font-600 transition-colors ${
                  isActive
                    ? 'text-orbyt-text bg-orbyt-surface'
                    : 'text-orbyt-muted hover:text-orbyt-text hover:bg-orbyt-surface/50'
                }`}
              >
                {link.label}
                {link.badge !== undefined && (
                  <span className="w-4 h-4 rounded-full bg-orbyt-emerald text-orbyt-bg text-[10px] font-display font-700 flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-5 h-0.5 bg-orbyt-emerald rounded-full" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 bg-orbyt-surface border border-orbyt-border rounded-lg px-3 py-1.5 w-56 focus-within:border-orbyt-emerald/40 transition-colors">
            <svg className="w-3.5 h-3.5 text-orbyt-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={isInvestor ? 'Search startups, sectors...' : 'Search investors, sectors...'}
              className="bg-transparent text-orbyt-text text-xs font-body placeholder:text-orbyt-muted outline-none w-full"
            />
            <div className="flex items-center gap-0.5 shrink-0">
              <kbd className="px-1 py-0.5 rounded border border-orbyt-border text-orbyt-muted text-[10px] font-body">⌘</kbd>
              <kbd className="px-1 py-0.5 rounded border border-orbyt-border text-orbyt-muted text-[10px] font-body">K</kbd>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotifications(v => !v); setShowProfile(false) }}
              className={`relative w-8 h-8 rounded-lg bg-orbyt-surface border flex items-center justify-center transition-colors ${
                showNotifications ? 'border-orbyt-emerald/40' : 'border-orbyt-border hover:border-orbyt-emerald/30'
              }`}
            >
              <svg className="w-4 h-4 text-orbyt-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orbyt-emerald ring-2 ring-orbyt-bg" />
            </button>
            {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
          </div>

          {/* Messages */}
          <button className="w-8 h-8 rounded-lg bg-orbyt-surface border border-orbyt-border flex items-center justify-center hover:border-orbyt-emerald/30 transition-colors">
            <svg className="w-4 h-4 text-orbyt-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
            </svg>
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setShowProfile(v => !v); setShowNotifications(false) }}
              className={`flex items-center gap-2 bg-orbyt-surface border rounded-lg px-2.5 py-1.5 transition-colors ${
                showProfile ? 'border-orbyt-emerald/40' : 'border-orbyt-border hover:border-orbyt-emerald/30'
              }`}
            >
              <div className="w-6 h-6 rounded-md bg-orbyt-emerald/15 border border-orbyt-emerald/20 flex items-center justify-center overflow-hidden">
                {user?.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-display font-700 text-orbyt-emerald text-[10px]">
                    {user?.fullName?.[0]?.toUpperCase() ?? 'U'}
                  </span>
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-orbyt-text text-xs font-display font-600 leading-tight max-w-[90px] truncate">
                  {user?.fullName ?? 'My Account'}
                </p>
                <p className="text-orbyt-muted text-[10px] font-body leading-tight capitalize">{user?.role ?? 'User'}</p>
              </div>
              <svg className="w-3.5 h-3.5 text-orbyt-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showProfile && <ProfileDropdown user={user} onClose={() => setShowProfile(false)} />}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar