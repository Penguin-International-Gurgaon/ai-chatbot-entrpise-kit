"use client";

import { Suspense, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserManagement } from "@/components/admin/user-management";
import { TokenRequestManagement } from "@/components/admin/token-request-management";
import { TokenAnalytics } from "@/components/admin/token-analytics";
import type {
  User,
  TokenRequest,
  TokenUsageData,
  UserTokenUsage,
} from "@/lib/db/schema";
import { RefreshCcw, Home } from "lucide-react";
import { useRouter } from "next/navigation";

type TabKey = "users" | "requests" | "token-analytics";

interface AdminDashboardProps {
  users: User[];
  tokenRequests: {
    request: TokenRequest;
    user: {
      id: string;
      email: string;
    };
  }[];
  tokenUsageData: TokenUsageData;
  userTokenUsage: UserTokenUsage[];
}

export function AdminDashboard({
  users,
  tokenRequests,
  tokenUsageData,
  userTokenUsage,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("users");
  const router = useRouter();

  const tabTriggerClass =
    "relative px-4 py-2 text-sm font-medium data-[state=active]:bg-muted rounded-md transition-colors";

  return (
    <section className="p-4 md:p-6 lg:p-8 max-w-screen-xl mx-auto space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between sticky top-0 z-20 bg-background py-4 border-b mb-2">
        <h1 className="text-xl md:text-2xl font-semibold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push("/")}>
            <Home className="mr-2 h-4 w-4" />
            Go to App
          </Button>
          <Button variant="secondary" onClick={() => router.refresh()}>
            <RefreshCcw className="mr-2 h-4 w-4 animate-spin-slow" />
            Refresh
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
        <TabsList
          className="flex flex-wrap gap-2 justify-start sticky top-[80px] z-10 bg-background py-2 border-b"
          aria-label="Admin Dashboard Tabs"
        >
          <TabsTrigger value="users" className={tabTriggerClass}>
            User Management
          </TabsTrigger>

          <TabsTrigger value="requests" className={tabTriggerClass}>
            Token Requests
            {tokenRequests.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center text-xs font-semibold rounded-full bg-destructive text-white w-5 h-5">
                {tokenRequests.length}
              </span>
            )}
          </TabsTrigger>

          <TabsTrigger value="token-analytics" className={tabTriggerClass}>
            Token Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <UserManagement usersWithUsage={userTokenUsage} />
        </TabsContent>

        <TabsContent value="requests" className="mt-6">
          <TokenRequestManagement tokenRequests={tokenRequests} />
        </TabsContent>

        <TabsContent value="token-analytics" className="mt-6">
          <Suspense fallback={<div className="text-center text-sm text-muted-foreground">Loading analytics...</div>}>
            <TokenAnalytics tokenUsageData={tokenUsageData} userTokenUsage={userTokenUsage} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </section>
  );
}
