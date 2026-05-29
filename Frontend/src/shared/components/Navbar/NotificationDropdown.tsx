import React, { useEffect, useRef } from 'react'
import { notificationsData } from '../../data/notificationsData' 

interface Props {
  onClose: () => void
}

const NotificationDropdown: React.FC<Props> = ({ onClose }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const unreadCount = notificationsData.filter(n => !n.read).length

  return (
    <div
      ref={ref}
      className="absolute right-0 top-10 w-[360px] bg-orbyt-surface border border-orbyt-border rounded-2xl shadow-2xl z-50 overflow-hidden"
      style={{ boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-orbyt-border">
        <div className="flex items-center gap-2">
          <span className="font-display font-700 text-orbyt-text text-sm">Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-orbyt-emerald/15 border border-orbyt-emerald/20 text-orbyt-emerald text-[10px] font-display font-700">
              {unreadCount} new
            </span>
          )}
        </div>
        <button className="text-orbyt-muted hover:text-orbyt-text text-xs font-display font-600 transition-colors">
          Mark all as read
        </button>
      </div>

      {/* List */}
      <div className="max-h-[420px] overflow-y-auto">
        {notificationsData.map(notification => (
          <div
            key={notification.id}
            className={`flex items-start gap-3 px-4 py-3.5 hover:bg-orbyt-surface2 cursor-pointer transition-colors border-b border-orbyt-border/50 last:border-0 ${
              !notification.read ? 'bg-orbyt-emerald/[0.02]' : ''
            }`}
          >
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-xl ${notification.avatarBg} flex items-center justify-center shrink-0 mt-0.5`}>
              {notification.avatarIcon ? (
                <span className="text-base leading-none">{notification.avatarIcon}</span>
              ) : (
                <span className="font-display font-700 text-orbyt-text text-xs">{notification.avatarInitials}</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <div className="flex items-center gap-1.5">
                  {notification.priority && (
                    <span className="px-1.5 py-0.5 rounded border border-orbyt-emerald/20 bg-orbyt-emerald/10 text-orbyt-emerald text-[9px] font-display font-700 uppercase tracking-wider">
                      Priority
                    </span>
                  )}
                  <span className="text-orbyt-muted text-[11px] font-body">{notification.time}</span>
                </div>
                {!notification.read && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orbyt-emerald shrink-0" />
                )}
              </div>
              <p className="text-orbyt-text text-xs font-body leading-snug">
                {notification.title}
                <span className="font-display font-700">{notification.boldWord}</span>
              </p>
              <p className="text-orbyt-muted text-[11px] font-body mt-0.5 truncate">{notification.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-orbyt-border">
        <button className="w-full text-center text-orbyt-emerald text-xs font-display font-600 hover:text-orbyt-emerald/80 transition-colors">
          View All Notifications
        </button>
      </div>
    </div>
  )
}

export default NotificationDropdown