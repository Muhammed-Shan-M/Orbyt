

export type UserRole = 'Founder' | 'Investor' | 'Admin'
export type UserStatus = 'Active' | 'Pending' | 'Suspended'
export type VerificationTier = 'Tier 1 Verified' | 'Tier 2 Verified' | 'Tier 3 Verified' | 'Unverified'



export interface DashboardStats {
  totalUsers: number
  totalFounders: number
  totalInvestors: number
  activeUsers: number
  pendingUsers: number
  suspendedUsers: number
}