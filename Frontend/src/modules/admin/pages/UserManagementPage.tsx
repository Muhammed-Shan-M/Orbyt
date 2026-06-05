'use client'

import { useEffect, useState } from 'react'
import { AdminSidebar } from '../layouts/admin-sidebar'
import { AdminNavbar } from '../layouts/admin-navbar'

import { UserDetailsModal } from '../components/user-details-modal'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Badge } from '@/shared/components/ui/badge'
import { Download, UserPlus, Search, Filter } from 'lucide-react'

import type { IUserDocument } from '@/shared/types/user'

import { useUsers } from '../hooks/useUsers'
import { useBlockUser } from '../hooks/useBlockUser'
import { useUnblockUser } from '../hooks/useUnblockUser'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { DataTable } from '@/shared/components/data-table/DataTable'

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<IUserDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const debouncedSearch = useDebounce(searchQuery, 500);

  const limit = 10;

  const { data, isLoading } = useUsers({
    page,
    limit,
    search: debouncedSearch,
    role: filterRole,
  });

  const { mutate: blockUserMutation } = useBlockUser();

  const { mutate: unblockUserMutation } = useUnblockUser();

  // const users = data?.users ?? []



  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterRole]);

  const totalPages = data?.totalPages ?? 1;

  const handleViewUser = (user: IUserDocument) => {
    console.log(user)
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  // console.log('Filtered Users:', users)

  const handleBlockUser = (userId: string) => {
    blockUserMutation(userId);
  };

  const handleUnblockUser = (userId: string) => {
    unblockUserMutation(userId);
  };

  const columns = [
    {
      header: "User",

      cell: (user: IUserDocument) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold flex-shrink-0">
            {user.fullName
              ?.split(' ')
              .map((n) => n[0])
              .join('')}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user.fullName}
            </p>

            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
      ),
    },

    {
      header: "Role",

      cell: (user: IUserDocument) => (
        <Badge variant="outline">
          {user.role}
        </Badge>
      ),
    },

    {
      header: "Status",

      cell: (user: IUserDocument) => (
        <Badge
          variant="outline"
          style={{
            borderColor:
              user.isBlocked
                ? '#EF4444'
                : '#00D084',
            color:
              user.isBlocked
                ? '#EF4444'
                : '#00D084',
          }}
        >
          {user.isBlocked
            ? 'Blocked'
            : 'Active'}
        </Badge>
      ),
    },

    {
      header: "Actions",

      cell: (user: IUserDocument) => (
        <>
          <Button>View</Button>
          <Button>Block</Button>
        </>
      ),
    },
  ];





  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading users...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <AdminNavbar />

      <main className="ml-56 mt-16 p-6">
        <div className="mb-6 text-sm text-muted-foreground">
          <span>Admin</span>
          <span className="mx-2">/</span>
          <span>Users</span>
        </div>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              User Management
            </h1>

            <p className="text-muted-foreground">
              View, filter, and manage founders and investors on the platform.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>

            <Button
              className="flex items-center gap-2"
              style={{
                backgroundColor: '#00D084',
                color: 'black',
              }}
            >
              <UserPlus className="w-4 h-4" />
              Add User
            </Button>
          </div>
        </div>

        <div className="bg-card/50 rounded-lg border border-border/50 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

              <Input
                placeholder="Search name or email..."
                className="pl-10 bg-muted/50 border-muted-foreground/20"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
              />
            </div>

            <div className="flex gap-2">
              {['All Users', 'Founders', 'Investors'].map((role) => {
                const roleValue =
                  role === 'All Users'
                    ? null
                    : role.slice(0, -1).toLowerCase()

                const isActive =
                  (role === 'All Users' &&
                    filterRole === null) ||
                  filterRole === roleValue

                return (
                  <Button
                    key={role}
                    variant={
                      isActive
                        ? 'default'
                        : 'outline'
                    }
                    className="text-sm"
                    style={
                      isActive
                        ? {
                          backgroundColor:
                            '#00D084',
                          color: 'black',
                        }
                        : {}
                    }
                    onClick={() =>
                      setFilterRole(
                        role === 'All Users'
                          ? null
                          : roleValue
                      )
                    }
                  >
                    {role}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              All Status
            </Button>
          </div>
        </div>

        {/* <div className="rounded-lg border border-border/50 bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Verification
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Approval
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/50">
                {data?.users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold flex-shrink-0">
                          {user.fullName
                            ?.split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {user.fullName}
                          </p>

                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        className="capitalize"
                      >
                        {user.role}
                      </Badge>
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        style={{
                          borderColor:
                            user.isBlocked
                              ? '#EF4444'
                              : '#00D084',
                          color:
                            user.isBlocked
                              ? '#EF4444'
                              : '#00D084',
                        }}
                      >
                        {user.isBlocked
                          ? 'Blocked'
                          : 'Active'}
                      </Badge>
                    </td>

                    <td className="px-6 py-4">
                      <Badge
                        variant="outline"
                        style={{
                          borderColor:
                            user.isEmailVerified
                              ? '#00D084'
                              : '#FFA500',
                          color:
                            user.isEmailVerified
                              ? '#00D084'
                              : '#FFA500',
                        }}
                      >
                        {user.isEmailVerified
                          ? 'Verified'
                          : 'Pending'}
                      </Badge>
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {user.isApproved
                        ? 'Approved'
                        : 'Pending Approval'}
                    </td>

                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleViewUser(user)
                        }
                      >
                        View
                      </Button>
                      {user.isBlocked ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleUnblockUser(user._id)
                          }
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleBlockUser(user._id)
                          }
                        >
                          Block
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-border/50 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {data?.users.length} users
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  size="sm"
                  variant={
                    page === pageNumber
                      ? "default"
                      : "outline"
                  }
                  style={
                    page === pageNumber
                      ? {
                        backgroundColor: "#00D084",
                        color: "black",
                      }
                      : {}
                  }
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div> */}


        <DataTable
          columns={columns}
          data={data?.users ?? []}
          currentPage={page}
          totalPages={totalPages}
          totalItems={data?.users.length ?? 0}
          onPageChange={setPage}
        />
      </main>

      <UserDetailsModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedUser(null)
        }}
        onBlock={handleBlockUser}
        onUnblock={handleUnblockUser}
      />
    </div>
  )
}