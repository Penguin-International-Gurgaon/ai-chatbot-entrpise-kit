"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { TokenUsageData, UserTokenUsage } from "@/lib/db/schema";
import { format } from "date-fns";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend } from "recharts";

interface TokenAnalyticsProps {
  tokenUsageData: TokenUsageData;
  userTokenUsage: UserTokenUsage[];
}

export function TokenAnalytics({ tokenUsageData, userTokenUsage }: TokenAnalyticsProps) {
  const [analytics, setAnalytics] = useState<TokenUsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState<string | "all">("all");
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnalytics(tokenUsageData);
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [tokenUsageData]);

  if (loading) {
    return <div className="py-12 text-center text-sm text-muted-foreground animate-pulse">Crunching numbers for you...</div>;
  }

  if (!analytics) {
    return <div className="py-12 text-center text-destructive">No analytics data available.</div>;
  }

  const filteredTimeSeries = analytics.timeSeriesData.filter(
    (data) => (selectedModel === "all" || data.modelId === selectedModel)
  );

  const usageOverTime = analytics.availableModels.map((model) => ({
    model,
    tokensUsed: filteredTimeSeries
      .filter((d) => d.modelId === model)
      .reduce((sum, d) => sum + d.tokensUsed, 0),
  }));

  const filteredTopUsers = analytics.topUsers.filter((user) =>
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="text-xl">Model-wise Token Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={(value) => setSelectedModel(value)} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {analytics.availableModels.map((model) => (
                <SelectItem key={model} value={model}>{model}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageOverTime} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="model" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tokensUsed" fill="#8884d8" name="Tokens Used" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="text-xl">Token Usage Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredTimeSeries.map(({ date, tokensUsed }) => ({
              date: format(new Date(date), "MM-dd"),
              tokensUsed,
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tokensUsed" stroke="#82ca9d" name="Tokens Used" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1 xl:col-span-2">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl">Token Usage by Users</CardTitle>
          <Input
            placeholder="Search users..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="max-w-xs"
          />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {userTokenUsage
              .filter((user) => user.email.toLowerCase().includes(searchUser.toLowerCase()))
              .map((user) => (
                <div key={user.id} className="border p-3 rounded-lg">
                  <p className="font-medium truncate">{user.email}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Total Used: {user.totalTokensUsed.toLocaleString()} tokens
                  </p>
                  <div className="space-y-1">
                    {user.modelUsage.map((mu) => {
                      const pct = mu.usedBudget / mu.totalBudget;
                      return (
                        <div key={mu.modelId} className="text-xs">
                          <span className="block font-medium">{mu.modelId}</span>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${Math.min(pct * 100, 100)}%` }}
                            />
                          </div>
                          <span className="text-muted-foreground">{mu.usedBudget.toLocaleString()} / {mu.totalBudget.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
