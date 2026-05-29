// ─── Deal Pipeline ───────────────────────────────────────────────────────────
export const dealPipeline = {
  initiated: { count: 18, delta: +4 },
  discussion: { count: 12, delta: 0 },
  dueDiligence: { count: 7, delta: -2 },
}

// ─── New Requests ─────────────────────────────────────────────────────────────
export type FundingStage = 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B'

export interface StartupRequest {
  id: string
  name: string
  stage: FundingStage
  description: string
  timeAgo: string
}

export const newRequests: StartupRequest[] = [
  {
    id: 'r1',
    name: 'HealthTech AI',
    stage: 'Series A',
    description: 'AI-powered diagnostic platform for early disease detection',
    timeAgo: '2 hours ago',
  },
  {
    id: 'r2',
    name: 'GreenEnergy Solutions',
    stage: 'Seed',
    description: 'Renewable energy storage and distribution network',
    timeAgo: '5 hours ago',
  },
  {
    id: 'r3',
    name: 'FinFlow',
    stage: 'Pre-Seed',
    description: 'B2B payment automation for SMEs in emerging markets',
    timeAgo: '1 day ago',
  },
]

// ─── Active Matches ───────────────────────────────────────────────────────────
export interface ActiveMatch {
  id: string
  name: string
  matchPercent: number
  lastMessageAgo: string
  avatarColor: string
}

export const activeMatches: ActiveMatch[] = [
  { id: 'm1', name: 'CloudScale', matchPercent: 92, lastMessageAgo: '1h ago', avatarColor: '#10B981' },
  { id: 'm2', name: 'DataStream Analytics', matchPercent: 88, lastMessageAgo: '3h ago', avatarColor: '#6366F1' },
  { id: 'm3', name: 'EduTech Pro', matchPercent: 85, lastMessageAgo: '2d ago', avatarColor: '#F59E0B' },
]

// ─── AI Suggestions ───────────────────────────────────────────────────────────
export type SectorTag = 'AI/ML' | 'Biotech' | 'FinTech' | 'CleanTech' | 'SaaS' | 'Web3'

export interface AISuggestion {
  id: string
  name: string
  sector: SectorTag
  description: string
  stage: FundingStage | 'Series B'
  matchPercent: number
}

export const aiSuggestions: AISuggestion[] = [
  {
    id: 's1',
    name: 'NeuralNet Systems',
    sector: 'AI/ML',
    description: 'Enterprise AI infrastructure for real-time data processing',
    stage: 'Series B',
    matchPercent: 95,
  },
  {
    id: 's2',
    name: 'BioGenix',
    sector: 'Biotech',
    description: 'Gene therapy platform for rare genetic disorders',
    stage: 'Series A',
    matchPercent: 91,
  },
  {
    id: 's3',
    name: 'QuantumPay',
    sector: 'FinTech',
    description: 'Blockchain-based cross-border payment infrastructure',
    stage: 'Seed',
    matchPercent: 89,
  },
]

// ─── Brief Requests ───────────────────────────────────────────────────────────
export type BriefStatus = 'Completed' | 'In Progress' | 'Sent' | 'Pending'

export interface BriefRequest {
  id: string
  company: string
  status: BriefStatus
  timeAgo: string
}

export const briefRequests: BriefRequest[] = [
  { id: 'b1', company: 'RoboTech Industries', status: 'Completed', timeAgo: '3 hours ago' },
  { id: 'b2', company: 'AgriTech Solutions', status: 'In Progress', timeAgo: '1 day ago' },
  { id: 'b3', company: 'SpaceLogistics', status: 'Sent', timeAgo: '2 days ago' },
]

// ─── Upcoming Meetings ────────────────────────────────────────────────────────
export interface Meeting {
  id: string
  title: string
  date: { month: string; day: number }
  time: string
  location: string
}

export const upcomingMeetings: Meeting[] = [
  {
    id: 'mt1',
    title: 'Pitch Meeting — CloudScale',
    date: { month: 'Mar', day: 24 },
    time: '2:00 PM – 3:00 PM',
    location: 'Zoom',
  },
  {
    id: 'mt2',
    title: 'Due Diligence Review — BioGenix',
    date: { month: 'Mar', day: 26 },
    time: '10:00 AM – 11:30 AM',
    location: 'Office',
  },
  {
    id: 'mt3',
    title: 'Portfolio Review — Q1 2024',
    date: { month: 'Mar', day: 28 },
    time: '3:00 PM – 4:30 PM',
    location: 'Google Meet',
  },
]

// ─── Stage tag color map ──────────────────────────────────────────────────────
export const stageColors: Record<FundingStage | 'Series B', string> = {
  'Pre-Seed': 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  'Seed': 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  'Series A': 'border-orbyt-emerald/30 text-orbyt-emerald bg-orbyt-emerald/10',
  'Series B': 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10',
}

export const sectorColors: Record<SectorTag, string> = {
  'AI/ML': 'border-violet-500/30 text-violet-400 bg-violet-500/10',
  'Biotech': 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  'FinTech': 'border-pink-500/30 text-pink-400 bg-pink-500/10',
  'CleanTech': 'border-green-500/30 text-green-400 bg-green-500/10',
  'SaaS': 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
  'Web3': 'border-orange-500/30 text-orange-400 bg-orange-500/10',
}

export const briefStatusColors: Record<BriefStatus, string> = {
  'Completed': 'text-orbyt-emerald',
  'In Progress': 'text-blue-400',
  'Sent': 'text-yellow-400',
  'Pending': 'text-orbyt-muted',
}

export const briefStatusDot: Record<BriefStatus, string> = {
  'Completed': 'bg-orbyt-emerald',
  'In Progress': 'bg-blue-400',
  'Sent': 'bg-yellow-400',
  'Pending': 'bg-orbyt-muted',
}