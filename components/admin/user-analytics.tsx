"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { DateRangePicker } from "@/components/admin/date-range-picker"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UserDetailView } from "@/components/admin/user-detail-view"
import type { UserTokenUsage } from "@/lib/db/schema"

interface UserAnalyticsProps {
  userTokenUsage: UserTokenUsage[]
}

export function UserAnalytics({ userTokenUsage }: UserAnalyticsProps) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date(),
  })
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false)

  // Get the selected user data
  const selectedUserData = userTokenUsage.find((user) => user.id === selectedUser)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userTokenUsage.length.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userTokenUsage
                .filter(
                  (user) =>
                    user.lastActive && new Date(user.lastActive) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                )
                .length.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Tokens Per User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                userTokenUsage.reduce((sum, user) => sum + user.totalTokensUsed, 0) / (userTokenUsage.length || 1),
              ).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <div>
            <Label htmlFor="user-filter">Filter by User</Label>
            <Select value={selectedUser || ""} onValueChange={setSelectedUser}>
              <SelectTrigger id="user-filter">
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {userTokenUsage.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date Range</Label>
            <DateRangePicker
              from={dateRange.from}
              to={dateRange.to}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setDateRange({ from: range.from, to: range.to })
                }
              }}
            />
          </div>

          {selectedUser && (
            <Button className="w-full" onClick={() => setIsDetailViewOpen(true)}>
              View User Details
            </Button>
          )}
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Most Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={userTokenUsage
                      .sort((a, b) => b.totalTokensUsed - a.totalTokensUsed)
                      .slice(0, 10)
                      .map((user) => ({
                        id: user.id,
                        email: user.email,
                        tokensUsed: user.totalTokensUsed,
                      }))}
                    margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      type="category"
                      dataKey="email"
                      width={90}
                      tickFormatter={(email) => (email.length > 15 ? `${email.substring(0, 15)}...` : email)}
                    />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} tokens`, "Usage"]} />
                    <Bar
                      dataKey="tokensUsed"
                      fill="#8884d8"
                      name="Tokens Used"
                      onClick={(data) => {
                        setSelectedUser(data.id)
                        setIsDetailViewOpen(true)
                      }}
                      cursor="pointer"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedUserData && (
        <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>User Details: {selectedUserData.email}</DialogTitle>
            </DialogHeader>
            <UserDetailView userData={selectedUserData} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
