'use client'

import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  CreditCard,
  HelpCircle,
  BarChart3,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux';
import type { AuthState } from '@/shared/types/authState';
import type { RootState } from '@/app/store/store';



const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'Verification',
    href: '/admin/verification',
    icon: CheckCircle,
  },
  {
    label: 'Subscriptions',
    href: '/admin/subscriptions',
    icon: CreditCard,
  },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: BarChart3,
  },
  {
    label: 'Help or Support',
    href: '/admin/support',
    icon: HelpCircle,
  },
]

export function AdminSidebar() {
  const {user} = useSelector((state:RootState ) => state.auth)
  const pathname = useLocation()

  console.log('user in sidebar:', user)

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 border-r border-border/50 bg-background/80 backdrop-blur-sm flex flex-col">
      {/* Logo */}
      <div className="border-b border-border/50 px-6 py-6">
        <Link to="/admin" className="inline-flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#00D084' }}
          >
            <span className="text-sm font-bold text-black">O</span>
          </div>
          <span className="text-lg font-semibold text-foreground">Orbyt</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="px-3 py-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Platform
          </p>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.pathname === item.href || pathname.pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-opacity-10 text-white'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
              style={
                isActive
                  ? {
                      backgroundColor: 'rgba(0, 208, 132, 0.1)',
                      color: '#00D084',
                    }
                  : {}
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer - Admin Profile */}
      <div className="border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
            {user?.fullName
              ?.split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.fullName}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.role === 'admin' ? 'Administrator' : 'User'}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}