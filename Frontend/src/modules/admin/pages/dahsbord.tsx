'use client'

import { AdminSidebar } from '../layouts/admin-sidebar'
import { AdminNavbar } from '../layouts/admin-navbar'
import { dashboardStats } from '../dummy/mock-data'
import { Users, User, AlertCircle, CheckCircle2 } from 'lucide-react'

const stats = [
  {
    label: 'Total Users',
    value: dashboardStats.totalUsers.toLocaleString(),
    subtext: `${(dashboardStats.totalFounders / 1000).toFixed(1)}k Founders • ${(dashboardStats.totalInvestors / 1000).toFixed(1)}k Investors`,
    icon: Users,
    color: '#00D084',
  },
  {
    label: 'Active Users',
    value: dashboardStats.activeUsers.toLocaleString(),
    subtext: `${((dashboardStats.activeUsers / dashboardStats.totalUsers) * 100).toFixed(1)}% of total`,
    icon: CheckCircle2,
    color: '#00D084',
  },
  {
    label: 'Pending Verification',
    value: dashboardStats.pendingUsers.toLocaleString(),
    subtext: 'Awaiting review',
    icon: AlertCircle,
    color: '#FFA500',
  },
  {
    label: 'Suspended Users',
    value: dashboardStats.suspendedUsers.toLocaleString(),
    subtext: 'Action required',
    icon: User,
    color: '#EF4444',
  },
]

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <AdminNavbar />

      {/* Main Content */}
      <main className="mt-16 p-6 md:ml-56">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and system insights</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-200 p-6 hover:shadow-lg hover:shadow-black/20"
              >
                {/* Icon Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>

                {/* Label */}
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>

                {/* Value */}
                <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>

                {/* Subtext */}
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </div>
            )
          })}
        </div>

        {/* Empty State for Additional Content */}
        <div className="mt-12 rounded-lg border border-dashed border-border/50 p-12 text-center">
          <p className="text-muted-foreground">
            More dashboard content coming soon (Charts, Recent Activity, etc.)
          </p>
        </div>
      </main>
    </div>
  )
}