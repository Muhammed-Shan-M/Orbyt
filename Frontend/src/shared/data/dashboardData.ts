// ─── Top Investor Matches ─────────────────────────────────────────────────────
export type InvestorFocus = 'FinTech' | 'SaaS' | 'AI/ML' | 'CleanTech' | 'Biotech' | 'B2B'

export interface InvestorMatch {
  id: string
  name: string
  title: string
  firm: string
  focus: InvestorFocus[]
  ticketSize: string
  matchPercent: number
  avatarColor: string
}

export const topMatches: InvestorMatch[] = [
  {
    id: 'im1',
    name: 'Sarah Chen',
    title: 'Venture Partner',
    firm: 'Sequoia Capital',
    focus: ['FinTech', 'SaaS', 'AI/ML'],
    ticketSize: '$500K – $5M',
    matchPercent: 94,
    avatarColor: '#10B981',
  },
  {
    id: 'im2',
    name: 'James Okafor',
    title: 'General Partner',
    firm: 'Benchmark Capital',
    focus: ['B2B', 'SaaS'],
    ticketSize: '$1M – $10M',
    matchPercent: 91,
    avatarColor: '#6366F1',
  },
  {
    id: 'im3',
    name: 'Priya Nair',
    title: 'Principal',
    firm: 'Andreessen Horowitz',
    focus: ['AI/ML', 'FinTech'],
    ticketSize: '$250K – $3M',
    matchPercent: 87,
    avatarColor: '#F59E0B',
  },
]

// ─── Investor Requests ────────────────────────────────────────────────────────
export interface InvestorRequest {
  id: string
  name: string
  title: string
  firm: string
  tag: InvestorFocus
  message: string
  timeAgo: string
  avatarColor: string
}

export const investorRequests: InvestorRequest[] = [
  {
    id: 'ir1',
    name: 'David Park',
    title: 'Principal',
    firm: 'Benchmark Capital',
    tag: 'FinTech',
    message:"I'm impressed by your traction in the payments space. Would love to discuss your expansion strategy and explore potential partnership opportunities.",
    timeAgo: '2h ago',
    avatarColor: '#8B5CF6',
  },
  {
    id: 'ir2',
    name: 'Jessica Liu',
    title: 'Lead Investor & Advisor',
    firm: '',
    tag: 'SaaS',
    message:"Your approach to solving workflow automation is exactly what the market needs. I'd like to learn more about your team and go-to-market strategy.",
    timeAgo: '5h ago',
    avatarColor: '#EC4899',
  }
]

// ─── Conversations ────────────────────────────────────────────────────────────
export interface Conversation {
  id: string
  name: string
  lastMessage: string
  timeAgo: string
  unread: boolean
  avatarColor: string
}

export const conversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Robert Kim',
    lastMessage: "That sounds great! Let's schedule a call next week.",
    timeAgo: '10m',
    unread: true,
    avatarColor: '#10B981',
  },
  {
    id: 'c2',
    name: 'Amanda Foster',
    lastMessage: 'Thanks for sharing the deck. I have a few questions about...',
    timeAgo: '1h',
    unread: true,
    avatarColor: '#6366F1',
  },
  {
    id: 'c3',
    name: 'James Wilson',
    lastMessage: 'Looking forward to our meeting tomorrow!',
    timeAgo: '3h',
    unread: false,
    avatarColor: '#F59E0B',
  },
  {
    id: 'c4',
    name: 'Lisa Martinez',
    lastMessage: 'The metrics are impressive. Can we dive deeper into the...',
    timeAgo: '1d',
    unread: false,
    avatarColor: '#EC4899',
  },
]

// ─── Upcoming Meetings ────────────────────────────────────────────────────────
export interface FounderMeeting {
  id: string
  title: string
  date: { month: string; day: number }
  time: string
  location: string
  locationType: 'video' | 'phone' | 'office'
}

export const upcomingMeetings: FounderMeeting[] = [
  {
    id: 'fm1',
    title: 'Pitch Review with Robert Kim',
    date: { month: 'Mar', day: 24 },
    time: '2:00 PM – 3:00 PM PST',
    location: 'Video Call',
    locationType: 'video',
  },
  {
    id: 'fm2',
    title: 'Strategy Discussion with Amanda Foster',
    date: { month: 'Mar', day: 26 },
    time: '10:00 AM – 11:00 AM PST',
    location: 'Video Call',
    locationType: 'video',
  },
  {
    id: 'fm3',
    title: 'Follow-up Call with James Wilson',
    date: { month: 'Mar', day: 28 },
    time: '4:00 PM – 4:30 PM PST',
    location: 'Phone Call',
    locationType: 'phone',
  },
]

// ─── Profile strength items ───────────────────────────────────────────────────
export const profileTasks = [
  { label: 'Upload Pitch Deck', done: false },
  { label: 'Add Financial Projections', done: false },
  { label: 'Verify Company Details', done: true },
]

// ─── Focus tag colors ─────────────────────────────────────────────────────────
export const focusColors: Record<InvestorFocus, string> = {
  'FinTech': 'border-pink-500/30 text-pink-400 bg-pink-500/10',
  'SaaS': 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
  'AI/ML': 'border-violet-500/30 text-violet-400 bg-violet-500/10',
  'CleanTech': 'border-green-500/30 text-green-400 bg-green-500/10',
  'Biotech': 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  'B2B': 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10',
}