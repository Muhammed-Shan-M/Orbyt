'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge'
import { Mail, Shield, Calendar, AlertCircle } from 'lucide-react'
import { useUser } from '../hooks/useUser';

interface UserDetailsModalProps {
    userId: string | null
    isOpen: boolean
    onClose: () => void
    onBlock?: (userId: string) => void
    onUnblock?: (userId: string) => void
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Active':
            return '#00D084'
        case 'Pending':
            return '#FFA500'
        case 'Suspended':
            return '#EF4444'
        default:
            return '#6B7280'
    }
}

// const getVerificationColor = (verification: string) => {
//     switch (verification) {
//         case 'Tier 1 Verified':
//         case 'Tier 2 Verified':
//         case 'Tier 3 Verified':
//             return '#00D084'
//         default:
//             return '#9CA3AF'
//     }
// }

export function UserDetailsModal({ userId, isOpen, onClose, onBlock, onUnblock, }: UserDetailsModalProps) {

    const { data: user, isLoading, } = useUser(userId);

    if (!userId) return null;

    if (!user) return null

    if (isLoading) {
        return (
            <Dialog
                open={isOpen}
                onOpenChange={onClose}
            >
                <DialogContent>
                    Loading user details...
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* User Header */}
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-lg font-semibold flex-shrink-0">
                            {(user.fullName ?? "")
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground">{user.fullName}</h3>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" style={{ borderColor: getStatusColor(user.status), color: getStatusColor(user.status) }}>
                            {user.status}
                        </Badge>
                        {/* <Badge variant="outline" style={{ borderColor: getVerificationColor(user.), color: getVerificationColor(user.verification) }}>
              {user.verification}
            </Badge> */}
                        <Badge variant="outline">{user.role}</Badge>
                        {user.isBlocked && (
                            <Badge variant="destructive" className="flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Blocked
                            </Badge>
                        )}
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 gap-3 rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="text-sm font-medium text-foreground">{user.email}</p>
                            </div>
                        </div>

                        {/* {user.company && (
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Company</p>
                  <p className="text-sm font-medium text-foreground">{user.company}</p>
                </div>
              </div>
            )} */}

                        <div className="flex items-center gap-3">
                            <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Verification</p>
                                <p className="text-sm font-medium text-foreground">{user.status}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-xs text-muted-foreground">Joined</p>
                                <p className="text-sm font-medium text-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Activity Info */}
                    <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-xs text-muted-foreground mb-1">Last Activity</p>
                        <p className="text-sm font-medium text-foreground">{user.status}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {user.isBlocked ? (
                            <Button
                                onClick={() => {
                                    onUnblock?.(user._id)
                                    onClose()
                                }}
                                className="flex-1"
                                style={{ backgroundColor: '#00D084', color: 'black' }}
                            >
                                Unblock User
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    onBlock?.(user._id)
                                    onClose()
                                }}
                                variant="destructive"
                                className="flex-1"
                            >
                                Block User
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}