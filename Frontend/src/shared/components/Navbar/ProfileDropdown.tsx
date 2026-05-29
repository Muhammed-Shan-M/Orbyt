import React, { useEffect, useRef } from 'react'
import type { IUser } from '../../types/user'
// import { logout } from '../../../modules/auth/store/auth.slice'
import { useLogout } from '../../../modules/auth/hooks/useLogout'

interface Props {
  user: IUser | null
  onClose: () => void
}

interface MenuItem {
  icon: React.ReactNode
  label: string
  path?: string
  badge?: string
  badgeColor?: string
  suffix?: React.ReactNode
}

const ProfileDropdown: React.FC<Props> = ({ user, onClose }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const logout = useLogout()



  const menuItems: MenuItem[] = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: 'Profile',
      path: `/${user?.role}/profile`,
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Account Settings',
      path: '/settings',
    },
  ]

  const secondGroup: MenuItem[] = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Your Bookings',
      path: '/bookings',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Requests & Matches',
      badge: '3 New',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      label: 'Saved / Shortlisted',
      path: '/saved',
    },
  ]

  const thirdGroup: MenuItem[] = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      label: 'Subscription / Plan',
      path: '/plan',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: 'Verification Status',
      suffix: (
        <span className="flex items-center gap-1 text-orbyt-emerald text-xs font-body">
          <span className="w-1.5 h-1.5 rounded-full bg-orbyt-emerald" />
          Verified
        </span>
      ),
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Help & Support',
      path: '/support',
    },
  ]

  const renderGroup = (items: MenuItem[]) =>
    items.map(item => (
      <button
        key={item.label}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-orbyt-muted hover:text-orbyt-text hover:bg-orbyt-surface2 transition-colors"
      >
        <span className="text-orbyt-muted shrink-0">{item.icon}</span>
        <span className="flex-1 text-left text-sm font-body">{item.label}</span>
        {item.badge && (
          <span className="px-2 py-0.5 rounded-lg bg-orbyt-emerald text-orbyt-bg text-[10px] font-display font-700">
            {item.badge}
          </span>
        )}
        {item.suffix}
      </button>
    ))

  return (
    <div
      ref={ref}
      className="absolute right-0 top-10 w-[260px] bg-orbyt-surface border border-orbyt-border rounded-2xl shadow-2xl z-50 overflow-hidden"
      style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}
    >
      {/* User info */}
      <div className="px-4 py-4 border-b border-orbyt-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orbyt-emerald/15 border border-orbyt-emerald/20 flex items-center justify-center">
            {user?.profileImageUrl ? (
              <img src={user.profileImageUrl} alt="" className="w-full h-full rounded-xl object-cover" />
            ) : (
              <span className="font-display font-700 text-orbyt-emerald text-sm">
                {user?.fullName?.[0] ?? 'U'}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-display font-700 text-orbyt-text text-sm truncate">{user?.fullName ?? 'User'}</p>
            <p className="text-orbyt-muted text-[11px] font-body truncate">{user?.email ?? ''}</p>
          </div>
          <span className="shrink-0 px-2 py-0.5 rounded-md bg-orbyt-emerald/10 border border-orbyt-emerald/20 text-orbyt-emerald text-[10px] font-display font-600 capitalize">
            {user?.role ?? 'User'}
          </span>
        </div>
      </div>

      {/* Menu groups */}
      <div className="p-2">
        <div className="space-y-0.5">{renderGroup(menuItems)}</div>

        <div className="my-1.5 border-t border-orbyt-border/50" />
        <div className="space-y-0.5">{renderGroup(secondGroup)}</div>

        <div className="my-1.5 border-t border-orbyt-border/50" />
        <div className="space-y-0.5">{renderGroup(thirdGroup)}</div>

        <div className="my-1.5 border-t border-orbyt-border/50" />
        <button
          onClick={() => {
            logout()
            onClose()
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="text-sm font-body">Log out</span>
        </button>
      </div>
    </div>
  )
}

export default ProfileDropdown