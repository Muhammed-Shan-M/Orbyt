export type UserRole = 'founder' | 'investor';
export type UserStatus = 'active' | 'blocked' | 'pending';
export type VerificationStatus = 'unverified' | 'pending' | 'approved' | 'rejected';
export type InvestorType = 'angel' | 'institutional' | 'vc' | 'corporate';

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  verificationStatus: VerificationStatus;
  avatarUrl?: string;
  joinedAt: string;
  lastActive: string;
  startupName?: string;       // for founders
  investorType?: InvestorType; // for investors
}

export interface InvestorApprovalRequest {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  investorType: InvestorType;
  submittedAt: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  // Details
  website?: string;
  linkedIn?: string;
  firmName?: string;
  aum?: string;           // assets under management
  investmentThesis?: string;
  portfolioCompanies?: string[];
  // Documents
  documents: InvestorDocument[];
}

export interface InvestorDocument {
  id: string;
  name: string;
  type: 'government_id' | 'accreditation_letter' | 'bank_statement' | 'firm_registration' | 'other';
  url: string;
  uploadedAt: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  totalFounders: number;
  totalInvestors: number;
  activeUsers: number;
  blockedUsers: number;
  pendingVerifications: number;
}