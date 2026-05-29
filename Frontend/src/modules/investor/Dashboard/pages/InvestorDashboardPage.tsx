import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../../app/store/store'
import Navbar from '../../../../shared/components/Navbar/Index'
import { dealPipeline, newRequests, activeMatches, aiSuggestions, briefRequests, upcomingMeetings, stageColors, sectorColors, briefStatusColors, briefStatusDot } from '../../../../shared/data/investorDashboardData'
import { getProfileCompletionApi } from '../api/api.profileComplete'

// ─── Small reusable pieces ────────────────────────────────────────────────────

const SectionHeader: React.FC<{ title: string; linkLabel?: string; linkTo?: string; dot?: string }> = ({
    title, linkLabel = 'View All', linkTo = '#', dot
}) => (
    <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
            {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
            <h2 className="font-display font-700 text-orbyt-text text-sm">{title}</h2>
        </div>
        <Link to={linkTo} className="flex items-center gap-1 text-orbyt-muted hover:text-orbyt-emerald text-xs font-display font-600 transition-colors">
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

const InvestorDashboardPage: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    const showBanner = user && !user.profileCompleted


    return (
        <div className="min-h-screen bg-orbyt-bg text-orbyt-text font-body">
            <Navbar />

            <div className="w-full max-w-[1700px] mx-auto px-6 py-8 space-y-6">

                {/* ── Profile completion banner ─────────────────────────────────── */}
                {showBanner && (
                    <div className="flex items-center justify-between gap-4 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl px-5 py-3.5">
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-yellow-400 text-xs font-display font-700">Complete your profile</p>
                                <p className="text-orbyt-muted text-xs font-body mt-0.5">
                                    Your profile is 60% complete. Add your investment preferences and portfolio details to receive better AI-matched opportunities.
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/investor/profile"
                            className="shrink-0 px-3.5 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-display font-700 hover:bg-yellow-500/20 transition-colors whitespace-nowrap"
                        >
                            Complete Now
                        </Link>

                        <button className="shrink-0 px-3.5 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-display font-700 hover:bg-yellow-500/20 transition-colors whitespace-nowrap">
                            api test
                        </button>
                    </div>
                )}

                {/* ── Page heading ─────────────────────────────────────────────── */}
                <div>
                    <h1 className="font-display font-800 text-2xl text-orbyt-text tracking-tight">Dashboard</h1>
                    <p className="text-orbyt-muted text-sm font-body mt-1">Overview of your investment activity and pending decisions.</p>
                </div>

                {/* ── Deal Pipeline ─────────────────────────────────────────────── */}
                <Card>
                    <SectionHeader title="Deal Pipeline" linkLabel="View All Deals" linkTo="/investor/deals" dot="bg-orbyt-emerald animate-pulse" />
                    <div className="grid grid-cols-3 gap-4">
                        {/* Initiated */}
                        <div className="flex items-center gap-4 bg-orbyt-surface2 rounded-xl px-4 py-4 border border-orbyt-border/50">
                            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                <svg className="w-4.5 h-4.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-orbyt-muted text-xs font-body">Initiated</p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="font-display font-800 text-2xl text-orbyt-text">{dealPipeline.initiated.count}</span>
                                    <span className="text-orbyt-emerald text-xs font-display font-600">+{dealPipeline.initiated.delta}</span>
                                </div>
                            </div>
                        </div>

                        {/* Discussion */}
                        <div className="flex items-center gap-4 bg-orbyt-surface2 rounded-xl px-4 py-4 border border-orbyt-border/50">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                <svg className="w-4.5 h-4.5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-orbyt-muted text-xs font-body">Discussion</p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="font-display font-800 text-2xl text-orbyt-text">{dealPipeline.discussion.count}</span>
                                    <span className="text-orbyt-muted text-xs font-display font-600">—</span>
                                </div>
                            </div>
                        </div>

                        {/* Due Diligence */}
                        <div className="flex items-center gap-4 bg-orbyt-surface2 rounded-xl px-4 py-4 border border-orbyt-border/50">
                            <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0">
                                <svg className="w-4.5 h-4.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-orbyt-muted text-xs font-body">Due Diligence</p>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="font-display font-800 text-2xl text-orbyt-text">{dealPipeline.dueDiligence.count}</span>
                                    <span className="text-red-400 text-xs font-display font-600">{dealPipeline.dueDiligence.delta}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* ── Row: New Requests + Active Matches ───────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* New Requests */}
                    <Card>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-orbyt-emerald" />
                                <h2 className="font-display font-700 text-orbyt-text text-sm">New Requests</h2>
                                <span className="w-5 h-5 rounded-full bg-red-500/80 text-white text-[10px] font-display font-700 flex items-center justify-center">
                                    {newRequests.length}
                                </span>
                            </div>
                            <Link to="/investor/requests" className="flex items-center gap-1 text-orbyt-muted hover:text-orbyt-emerald text-xs font-display font-600 transition-colors">
                                View All
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {newRequests.map(req => (
                                <div key={req.id} className="flex items-center justify-between gap-3 py-3 border-b border-orbyt-border/50 last:border-0 last:pb-0">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-display font-700 text-orbyt-text text-sm">{req.name}</span>
                                            <span className={`px-1.5 py-0.5 rounded border text-[10px] font-display font-600 ${stageColors[req.stage]}`}>
                                                {req.stage}
                                            </span>
                                        </div>
                                        <p className="text-orbyt-muted text-xs font-body truncate">{req.description}</p>
                                        <p className="text-orbyt-muted/60 text-[11px] font-body mt-0.5">{req.timeAgo}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <button className="px-3 py-1.5 rounded-lg bg-orbyt-emerald/10 border border-orbyt-emerald/20 text-orbyt-emerald text-xs font-display font-700 hover:bg-orbyt-emerald/20 transition-colors">
                                            Accept
                                        </button>
                                        <button className="px-3 py-1.5 rounded-lg bg-orbyt-surface2 border border-orbyt-border text-orbyt-muted text-xs font-display font-600 hover:border-red-500/30 hover:text-red-400 transition-colors">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Active Matches */}
                    <Card>
                        <SectionHeader title="Active Matches" linkTo="/investor/matches" dot="bg-orbyt-emerald" />
                        <div className="space-y-3">
                            {activeMatches.map(match => (
                                <div key={match.id} className="flex items-center gap-3 py-3 border-b border-orbyt-border/50 last:border-0 last:pb-0">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-display font-700"
                                        style={{ backgroundColor: match.avatarColor + '25', border: `1px solid ${match.avatarColor}35` }}
                                    >
                                        <span style={{ color: match.avatarColor }}>{match.name[0]}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-display font-700 text-orbyt-text text-sm">{match.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-orbyt-emerald" />
                                                <span className="text-orbyt-emerald text-xs font-display font-600">{match.matchPercent}% match</span>
                                            </span>
                                            <span className="text-orbyt-muted/50">·</span>
                                            <span className="text-orbyt-muted text-xs font-body">Last message {match.lastMessageAgo}</span>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orbyt-emerald/10 border border-orbyt-emerald/20 text-orbyt-emerald text-xs font-display font-700 hover:bg-orbyt-emerald/20 transition-colors shrink-0">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
                                        </svg>
                                        Open Chat
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* ── Row: AI Suggestions + Brief Requests ─────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Top AI Suggestions */}
                    <Card>
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-orbyt-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <h2 className="font-display font-700 text-orbyt-text text-sm">Top AI Suggestions</h2>
                            </div>
                            <Link to="/investor/discovery" className="flex items-center gap-1 text-orbyt-muted hover:text-orbyt-emerald text-xs font-display font-600 transition-colors">
                                View All
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {aiSuggestions.map(s => (
                                <div key={s.id} className="flex items-center justify-between gap-3 py-3 border-b border-orbyt-border/50 last:border-0 last:pb-0">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-display font-700 text-orbyt-text text-sm">{s.name}</span>
                                            <span className={`px-1.5 py-0.5 rounded border text-[10px] font-display font-600 ${sectorColors[s.sector]}`}>
                                                {s.sector}
                                            </span>
                                        </div>
                                        <p className="text-orbyt-muted text-xs font-body truncate">{s.description}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`px-1.5 py-0.5 rounded border text-[10px] font-display font-600 ${stageColors[s.stage as keyof typeof stageColors]}`}>
                                                {s.stage}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                                <span className="text-yellow-400 text-[11px] font-display font-600">{s.matchPercent}% match</span>
                                            </span>
                                        </div>
                                    </div>
                                    <button className="shrink-0 px-3.5 py-1.5 rounded-lg bg-orbyt-surface2 border border-orbyt-border text-orbyt-muted text-xs font-display font-600 hover:border-orbyt-emerald/30 hover:text-orbyt-text transition-colors">
                                        View
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Brief Requests */}
                    <Card>
                        <SectionHeader title="Brief Requests" linkTo="/investor/briefs" dot="bg-blue-400" />
                        <div className="space-y-3">
                            {briefRequests.map(b => (
                                <div key={b.id} className="flex items-center justify-between gap-3 py-3 border-b border-orbyt-border/50 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-display font-700 text-orbyt-text text-sm">{b.company}</p>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <span className={`w-1.5 h-1.5 rounded-full ${briefStatusDot[b.status]}`} />
                                            <span className={`text-xs font-display font-600 ${briefStatusColors[b.status]}`}>{b.status}</span>
                                            <span className="text-orbyt-muted/50">·</span>
                                            <span className="text-orbyt-muted text-xs font-body">{b.timeAgo}</span>
                                        </div>
                                    </div>
                                    {b.status === 'Completed' ? (
                                        <button className="shrink-0 px-3.5 py-1.5 rounded-lg bg-orbyt-emerald/10 border border-orbyt-emerald/20 text-orbyt-emerald text-xs font-display font-700 hover:bg-orbyt-emerald/20 transition-colors">
                                            View Summary
                                        </button>
                                    ) : (
                                        <button className="shrink-0 px-3.5 py-1.5 rounded-lg bg-orbyt-surface2 border border-orbyt-border text-orbyt-muted text-xs font-display font-600 hover:border-orbyt-emerald/30 transition-colors">
                                            Pending
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* ── Upcoming Meetings ──────────────────────────────────────────── */}
                <Card>
                    <SectionHeader title="Upcoming Meetings" linkLabel="View Calendar" linkTo="/investor/calendar" dot="bg-orbyt-emerald" />
                    <div className="space-y-3">
                        {upcomingMeetings.map(meeting => (
                            <div key={meeting.id} className="flex items-center gap-4 py-3 border-b border-orbyt-border/50 last:border-0 last:pb-0">
                                {/* Date chip */}
                                <div className="w-12 shrink-0 text-center bg-orbyt-surface2 border border-orbyt-border rounded-xl py-2">
                                    <p className="text-orbyt-emerald text-[10px] font-display font-700 uppercase tracking-wider">{meeting.date.month}</p>
                                    <p className="font-display font-800 text-orbyt-text text-lg leading-none mt-0.5">{meeting.date.day}</p>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-display font-700 text-orbyt-text text-sm">{meeting.title}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="flex items-center gap-1 text-orbyt-muted text-xs font-body">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {meeting.time}
                                        </span>
                                        <span className="flex items-center gap-1 text-orbyt-muted text-xs font-body">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            </svg>
                                            {meeting.location}
                                        </span>
                                    </div>
                                </div>
                                <button className="shrink-0 px-3.5 py-1.5 rounded-lg bg-orbyt-surface2 border border-orbyt-border text-orbyt-muted text-xs font-display font-600 hover:border-orbyt-emerald/30 hover:text-orbyt-text transition-colors">
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>

            </div>
        </div>
    )
}

export default InvestorDashboardPage