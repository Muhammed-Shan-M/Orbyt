'use client'

import { Search, Bell } from 'lucide-react'
import { Input } from '@/shared/components/ui/input'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store/store'


export function AdminNavbar() {
  const {user} = useSelector((state:RootState ) => state.auth)

  return (
    <header className="fixed top-0 left-56 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users, startups, transactions..."
            className="pl-10 bg-muted/50 border-muted-foreground/20"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: '#00D084' }}
          ></span>
        </button>

        {/* Profile Avatar */}
        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold hover:opacity-80 transition-opacity">
          {user?.fullName
            ?.split(' ')
            .map((n) => n[0])
            .join('')}
        </button>
      </div>
    </header>
  )
}