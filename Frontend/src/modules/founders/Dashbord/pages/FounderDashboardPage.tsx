import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../app/store/store' 
import Navbar from '../../../../shared/components/Navbar/Index' 
import {  topMatches,  investorRequests,  conversations,  upcomingMeetings,  profileTasks,  focusColors,} from '../../../../shared/data/dashboardData' // adjust to your data path



const SectionHeader: React.FC<{ title: string; subtitle?: string; linkLabel?: string; linkTo?: string }> = ({
  title, subtitle, linkLabel = 'View All', linkTo = '#'
}) => (
  <div className="flex items-start justify-between mb-5">
    <div>
      <h2 className="font-display font-700 text-orbyt-text text-base">{title}</h2>
      {subtitle && <p className="text-orbyt-muted text-xs font-body mt-0.5">{subtitle}</p>}
    </div>
    <Link to={linkTo} className="flex items-center gap-1 text-orbyt-muted hover:text-orbyt-emerald text-xs font-display font-600 transition-colors shrink-0 mt-0.5">
      {linkLabel}
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
)

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-orbyt-surface border border-orbyt-border rounded-2xl p-5 ${className}`}>
    {children}
  </div>
)

// ─── Main Component ───────────────────────────────────────────────────────────

const FounderDashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)

  const showBanner = user && !user.profileCompleted
  const completedTasks = profileTasks.filter(t => t.done).length
  const profileStrength = Math.round((completedTasks / profileTasks.length) * 100)

  return (
    <div className="min-h-screen bg-orbyt-bg text-orbyt-text font-body">
      <Navbar />

      <div className="w-full max-w-[1700px] mx-auto px-6 py-8 space-y-6">

        {/* ── Profile completion banner ─────────────────────────────────── */}
        {showBanner && (
          <div className="bg-orbyt-surface border border-orbyt-border rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-orbyt-emerald/10 border border-orbyt-emerald/20 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-orbyt-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-700 text-orbyt-text text-sm">Complete your profile to unlock full access</p>
                  <p className="text-orbyt-muted text-xs font-body mt-0.5">
                    Investors are 3× more likely to engage with founders who have a complete profile.
                  </p>
                </div>
              </div>
              <Link
                to="/founder/profile"
                className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orbyt-emerald/10 border border-orbyt-emerald/20 text-orbyt-emerald text-xs font-display font-700 hover:bg-orbyt-emerald/20 transition-colors"
              >
                Complete Profile
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-orbyt-muted text-xs font-display font-600">Profile Strength</span>
              <div className="flex-1 h-1.5 bg-orbyt-surface2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orbyt-emerald rounded-full transition-all duration-500"
                  style={{ width: `${profileStrength}%` }}
                />
              </div>
              <span className="text-orbyt-emerald text-xs font-display font-700">{profileStrength}%</span>
            </div>

            {/* Task chips */}
            <div className="flex flex-wrap gap-2">
              {profileTasks.filter(t => !t.done).map(task => (
                <span key={task.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400 text-xs font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {task.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Page heading ─────────────────────────────────────────────── */}
        <div>
          <h1 className="font-display font-800 text-2xl text-orbyt-text tracking-tight">Dashboard</h1>
          <p className="text-orbyt-muted text-sm font-body mt-1">Your funding journey at a glance.</p>
        </div>

        {/* ── Top Matches ───────────────────────────────────────────────── */}
        <div>
          <SectionHeader
            title="Top Matches"
            subtitle="AI-curated investors based on your industry and stage."
            linkLabel="View All Matches"
            linkTo="/founder/matches"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topMatches.map(investor => (
              <div
                key={investor.id}
                className="bg-orbyt-surface border border-orbyt-border rounded-2xl p-5 hover:border-orbyt-emerald/30 hover:bg-orbyt-surface2 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-base font-display font-700 shrink-0"
                    style={{ backgroundColor: investor.avatarColor + '20', border: `1px solid ${investor.avatarColor}35`, color: investor.avatarColor }}
                  >
                    {investor.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-700 text-orbyt-text text-sm truncate">{investor.name}</p>
                    <p className="text-orbyt-muted text-[11px] font-body truncate">{investor.title} at {investor.firm}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-orbyt-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div className="flex flex-wrap gap-1">
                      {investor.focus.map(f => (
                        <span key={f} className={`px-1.5 py-0.5 rounded border text-[10px] font-display font-600 ${focusColors[f]}`}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-orbyt-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-orbyt-muted text-xs font-body">{investor.ticketSize}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orbyt-emerald" />
                    <span className="text-orbyt-emerald text-xs font-display font-700">{investor.matchPercent}% match</span>
                  </div>
                  <button className="text-orbyt-muted group-hover:text-orbyt-emerald text-xs font-display font-600 transition-colors flex items-center gap-1">
                    Connect
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Investor Requests ─────────────────────────────────────────── */}
        <div>
          <SectionHeader
            title="Investor Requests"
            subtitle="Investors interested in connecting with you."
            linkTo="/founder/requests"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {investorRequests.map(req => (
              <div key={req.id} className="bg-orbyt-surface border border-orbyt-border rounded-2xl p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-display font-700 shrink-0"
                      style={{ backgroundColor: req.avatarColor + '20', border: `1px solid ${req.avatarColor}35`, color: req.avatarColor }}
                    >
                      {req.name[0]}
                    </div>
                    <div>
                      <p className="font-display font-700 text-orbyt-text text-sm">{req.name}</p>
                      <p className="text-orbyt-muted text-[11px] font-body">{req.title}{req.firm ? ` at ${req.firm}` : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-1.5 py-0.5 rounded border text-[10px] font-display font-600 ${focusColors[req.tag]}`}>
                      {req.tag}
                    </span>
                    <span className="text-orbyt-muted text-[11px] font-body">{req.timeAgo}</span>
                  </div>
                </div>

                <p className="text-orbyt-muted text-xs font-body leading-relaxed mb-4">{req.message}</p>

                <div className="flex items-center gap-3">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-orbyt-emerald/10 border border-orbyt-emerald/20 text-orbyt-emerald text-xs font-display font-700 hover:bg-orbyt-emerald/20 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-orbyt-emerald" />
                    Accept
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-orbyt-surface2 border border-orbyt-border text-orbyt-muted text-xs font-display font-600 hover:border-red-500/30 hover:text-red-400 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-orbyt-muted" />
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Row: Conversations + Upcoming Meetings ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Conversations */}
          <Card>
            <SectionHeader
              title="Conversations"
              subtitle="Active chats with matched investors."
              linkTo="/founder/messages"
            />
            <div className="space-y-1">
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orbyt-surface2 transition-colors text-left"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-display font-700 shrink-0 relative"
                    style={{ backgroundColor: conv.avatarColor + '20', border: `1px solid ${conv.avatarColor}30`, color: conv.avatarColor }}
                  >
                    {conv.name[0]}
                    {conv.unread && (
                      <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-orbyt-emerald ring-2 ring-orbyt-surface" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-display ${conv.unread ? 'font-700 text-orbyt-text' : 'font-600 text-orbyt-muted'}`}>
                        {conv.name}
                      </span>
                      <span className="text-orbyt-muted text-[11px] font-body shrink-0">{conv.timeAgo}</span>
                    </div>
                    <p className="text-orbyt-muted text-xs font-body truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <SectionHeader
              title="Upcoming Meetings"
              subtitle="Scheduled calls with investors."
              linkLabel="View Calendar"
              linkTo="/founder/calendar"
            />
            <div className="space-y-3">
              {upcomingMeetings.map(meeting => (
                <div key={meeting.id} className="flex items-center gap-4 py-3 border-b border-orbyt-border/50 last:border-0 last:pb-0">
                  <div className="w-12 shrink-0 text-center bg-orbyt-surface2 border border-orbyt-border rounded-xl py-2">
                    <p className="text-orbyt-emerald text-[10px] font-display font-700 uppercase tracking-wider">{meeting.date.month}</p>
                    <p className="font-display font-800 text-orbyt-text text-lg leading-none mt-0.5">{meeting.date.day}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-700 text-orbyt-text text-sm">{meeting.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-orbyt-muted text-[11px] font-body">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {meeting.time}
                      </span>
                      <span className="flex items-center gap-1 text-orbyt-muted text-[11px] font-body">
                        {meeting.locationType === 'video' && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                        )}
                        {meeting.locationType === 'phone' && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                        {meeting.location}
                      </span>
                    </div>
                  </div>
                  <button className="shrink-0 px-3 py-1.5 rounded-lg bg-orbyt-surface2 border border-orbyt-border text-orbyt-muted text-xs font-display font-600 hover:border-orbyt-emerald/30 hover:text-orbyt-text transition-colors">
                    View
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}

export default FounderDashboardPage