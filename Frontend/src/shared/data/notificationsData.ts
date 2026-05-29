export type NotificationType = 'request' | 'match' | 'brief' | 'message' | 'meeting'

export interface Notification {
  id: string
  type: NotificationType
  priority?: boolean
  title: string
  boldWord: string
  subtitle: string
  time: string
  read: boolean
  avatarInitials?: string
  avatarBg: string
  avatarIcon?: string
}

export const notificationsData: Notification[] = [
  {
    id: 'n1',
    type: 'request',
    priority: true,
    title: 'New request from ',
    boldWord: 'QuantumLeap AI',
    subtitle: 'Seed round · AI/ML · $2M allocation available',
    time: '12m ago',
    read: false,
    avatarInitials: 'QL',
    avatarBg: 'bg-orbyt-emerald/10',
  },
  {
    id: 'n2',
    type: 'match',
    title: 'You matched with ',
    boldWord: 'GreenCircle',
    subtitle: 'Climate Tech · View their updated deck',
    time: '2h ago',
    read: false,
    avatarIcon: '👋',
    avatarBg: 'bg-green-500/15',
  },
  {
    id: 'n3',
    type: 'brief',
    priority: true,
    title: 'Brief summary ready for ',
    boldWord: 'EduPath',
    subtitle: 'Your requested due diligence summary is ready',
    time: '5h ago',
    read: false,
    avatarIcon: '📋',
    avatarBg: 'bg-blue-500/15',
  },
  {
    id: 'n4',
    type: 'message',
    title: 'New message from ',
    boldWord: 'HealthSync',
    subtitle: '"Thanks for the feedback on our go-to-market..."',
    time: 'Yesterday',
    read: true,
    avatarInitials: 'HS',
    avatarBg: 'bg-purple-500/15',
  },
  {
    id: 'n5',
    type: 'meeting',
    title: 'Meeting scheduled with ',
    boldWord: 'FinFlow',
    subtitle: 'Tomorrow at 10:00 AM PST via Zoom',
    time: 'Oct 24',
    read: true,
    avatarIcon: '📅',
    avatarBg: 'bg-orange-500/15',
  },
]