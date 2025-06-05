"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateTokenRequestStatus, bulkUpdateTokenRequestStatus } from "@/app/admin/actions";
import type { TokenRequest } from "@/lib/db/schema";
import { formatDistanceToNow, isAfter, subDays } from "date-fns";

interface TokenRequestManagementProps {
  tokenRequests: {
    request: TokenRequest;
    user: {
      id: string;
      email: string;
    };
  }[];
}

export function TokenRequestManagement({ tokenRequests }: TokenRequestManagementProps) {
  const [selectedRequests, setSelectedRequests] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredRequests = useMemo(() => {
    return tokenRequests
      .filter(({ user }) => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(({ request }) => showAll || isAfter(new Date(request.createdAt), subDays(new Date(), 30)))
      .sort((a, b) =>
        sortBy === "date"
          ? new Date(b.request.createdAt).getTime() - new Date(a.request.createdAt).getTime()
          : a.user.email.localeCompare(b.user.email)
      );
  }, [tokenRequests, sortBy, searchTerm, showAll]);

  const selectedRequestIds = Object.entries(selectedRequests)
    .filter(([_, isSelected]) => isSelected)
    .map(([requestId]) => requestId);

  const hasSelectedRequests = selectedRequestIds.length > 0;

  const toggleSelectAll = (checked: boolean) => {
    setSelectedRequests(
      checked
        ? Object.fromEntries(filteredRequests.map(({ request }) => [request.id, true]))
        : {}
    );
  };

  const handleBulkAction = async (status: "approved" | "rejected") => {
    await bulkUpdateTokenRequestStatus({ requestIds: selectedRequestIds, status });
    setSelectedRequests({});
    toast.success(`Requests successfully ${status}.`);
  };

  const handleUpdate = async (requestId: string, status: "approved" | "rejected") => {
    await updateTokenRequestStatus({ requestId, status });
    toast.success(`Request ${status}.`);
  };

  if (filteredRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No pending token requests</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="select-all-requests"
            checked={filteredRequests.every(({ request }) => selectedRequests[request.id])}
            onCheckedChange={(checked) => toggleSelectAll(!!checked)}
          />
          <Label htmlFor="select-all-requests" className="cursor-pointer">
            Select All
          </Label>
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setSortBy(sortBy === "date" ? "name" : "date")}>Sort by {sortBy === "date" ? "Name" : "Date"}</Button>
          {!showAll && <Button variant="outline" onClick={() => setShowAll(true)}>Load Older</Button>}
        </div>
      </div>

      {hasSelectedRequests && (
        <div className="sticky top-0 z-10 mb-6 p-4 bg-muted rounded-lg shadow flex items-center justify-between">
          <p className="font-medium">{selectedRequestIds.length} requests selected</p>
          <div className="flex space-x-2">
            <Button onClick={() => handleBulkAction("approved")}>Approve Selected</Button>
            <Button variant="destructive" onClick={() => handleBulkAction("rejected")}>Reject Selected</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRequests.map(({ request, user }) => (
          <Card key={request.id} className={`relative ${selectedRequests[request.id] ? "border-primary shadow-lg" : ""}`}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={!!selectedRequests[request.id]}
                    onCheckedChange={(checked) => setSelectedRequests((prev) => ({ ...prev, [request.id]: !!checked }))}
                  />
                  <span className="font-medium">{user.email}</span>
                </div>
                <Badge variant="secondary">
                  {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Model</Label>
                  <p>{request.modelId}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Requested Tokens</Label>
                  <p>{request.requestedAmount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button className="flex-1" onClick={() => handleUpdate(request.id, "approved")}>Approve</Button>
                <Button variant="destructive" className="flex-1" onClick={() => handleUpdate(request.id, "rejected")}>Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
