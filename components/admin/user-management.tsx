"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { chatModels } from "@/lib/ai/models";
import { updateUserAdminStatus, upsertTokenBudget, bulkUpdateTokenBudget, bulkSetTokenBudgetToZero } from "@/app/admin/actions";
import type { UserTokenUsage } from "@/lib/db/schema";
import { toast } from "sonner";

// User row component to handle dialog states properly
function UserRow({ 
  user, 
  selectedUsers, 
  setSelectedUsers 
}: { 
  user: UserTokenUsage; 
  selectedUsers: Record<string, boolean>; 
  setSelectedUsers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>; 
}) {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isAllocationOpen, setIsAllocationOpen] = useState(false);

  return (
    <TableRow key={user.id}>
      <TableCell>
        <Checkbox
          checked={!!selectedUsers[user.id]}
          onCheckedChange={(checked) =>
            setSelectedUsers((prev) => ({ ...prev, [user.id]: !!checked }))
          }
        />
      </TableCell>
      <TableCell className="truncate max-w-xs">{user.email}</TableCell>
      <TableCell>
        <div className="flex items-center space-x-2">
          <Switch
            id={`admin-${user.id}`}
            checked={user.is_admin}
            onCheckedChange={async () => {
              const newVal = !user.is_admin;
              await updateUserAdminStatus({ userId: user.id, is_admin: newVal });
              user.is_admin = newVal;
            }}
          />
          <Label htmlFor={`admin-${user.id}`}>Admin</Label>
        </div>
      </TableCell>
      <TableCell>
        <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mr-2">Manage Tokens</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Manage Token Budgets for {user.email}</DialogTitle>
            </DialogHeader>
            <TokenBudgetForm userId={user.id} onComplete={() => setIsManageOpen(false)} />
          </DialogContent>
        </Dialog>

        <TokenAllocationDialog
          user={user}
          open={isAllocationOpen}
          onOpenChange={setIsAllocationOpen}
        />

        <Button variant="secondary" size="sm" onClick={() => setIsAllocationOpen(true)}>
          View Allocations
        </Button>
      </TableCell>
    </TableRow>
  );
}


interface UserManagementProps {
  usersWithUsage: UserTokenUsage[];
}

export function UserManagement({ usersWithUsage }: UserManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Record<string, boolean>>({});
  const [isBulkTokenDialogOpen, setIsBulkTokenDialogOpen] = useState(false);
  const [isBulkRevokeDialogOpen, setIsBulkRevokeDialogOpen] = useState(false);

  const filteredUsers = usersWithUsage.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()));
  const selectedUserIds = Object.entries(selectedUsers).filter(([_, selected]) => selected).map(([userId]) => userId);
  const hasSelectedUsers = selectedUserIds.length > 0;

  const tokenSummary = useMemo(() => {
    const modelTokenMap: Record<string, number> = {};
    usersWithUsage.forEach((user) => {
      for (const usage of user.modelUsage || []) {
        modelTokenMap[usage.modelId] = (modelTokenMap[usage.modelId] || 0) + (usage.totalBudget ?? 0);
      }
    });
    return modelTokenMap;
  }, [usersWithUsage]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search users by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />

        <div className="flex space-x-2">
          <Dialog open={isBulkTokenDialogOpen} onOpenChange={setIsBulkTokenDialogOpen}>
            <DialogTrigger asChild>
              <Button disabled={!hasSelectedUsers}>Assign Tokens</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Assign Tokens to {selectedUserIds.length} Users</DialogTitle>
              </DialogHeader>
              <BulkTokenForm userIds={selectedUserIds} onComplete={() => setIsBulkTokenDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={isBulkRevokeDialogOpen} onOpenChange={setIsBulkRevokeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" disabled={!hasSelectedUsers}>Revoke Tokens</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Revoke Tokens from {selectedUserIds.length} Users</DialogTitle>
              </DialogHeader>
              <BulkRevokeForm userIds={selectedUserIds} onComplete={() => setIsBulkRevokeDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Token Allocation Summary</h2>
        <ul className="text-sm text-muted-foreground grid md:grid-cols-3 gap-2">
          {chatModels.map((model) => (
            <li key={model.id}>
              {model.name}: <strong>{tokenSummary[model.id] || 0}</strong>
            </li>
          ))}
        </ul>
        <hr />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={filteredUsers.length > 0 && filteredUsers.every((user) => selectedUsers[user.id])}
                onCheckedChange={(checked) => {
                  const newSelected = { ...selectedUsers };
                  filteredUsers.forEach((user) => {
                    newSelected[user.id] = !!checked;
                  });
                  setSelectedUsers(newSelected);
                }}
              />
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredUsers.map((user) => (
            <UserRow 
              key={user.id}
              user={user} 
              selectedUsers={selectedUsers} 
              setSelectedUsers={setSelectedUsers} 
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TokenBudgetForm({ userId, onComplete }: { userId: string; onComplete: () => void }) {
  const [selectedModel, setSelectedModel] = useState(chatModels[0].id)
  const [tokenAmount, setTokenAmount] = useState("10000")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await upsertTokenBudget({
        userId,
        modelId: selectedModel,
        totalBudget: Number.parseInt(tokenAmount),
      })
      onComplete()
    } catch (error) {
      console.error("Failed to update token budget:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <select
          id="model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {chatModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tokens">Token Budget</Label>
        <Input id="tokens" type="number" value={tokenAmount} onChange={(e) => setTokenAmount(e.target.value)} min="0" />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Updating..." : "Update Budget"}
      </Button>
    </form>
  )
}

function BulkTokenForm({
  userIds,
  onComplete,
}: {
  userIds: string[]
  onComplete: () => void
}) {
  const [selectedModel, setSelectedModel] = useState(chatModels[0].id)
  const [tokenAmount, setTokenAmount] = useState("10000")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await bulkUpdateTokenBudget({
        userIds,
        modelId: selectedModel,
        totalBudget: Number.parseInt(tokenAmount),
      })
      onComplete()
    } catch (error) {
      console.error("Failed to update token budgets:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="bulk-model">Model</Label>
        <select
          id="bulk-model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {chatModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bulk-tokens">Token Budget</Label>
        <Input
          id="bulk-tokens"
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          min="0"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Updating..." : `Assign Tokens to ${userIds.length} Users`}
      </Button>
    </form>
  )
}

function BulkRevokeForm({
  userIds,
  onComplete,
}: {
  userIds: string[]
  onComplete: () => void
}) {
  const [selectedModels, setSelectedModels] = useState<Record<string, boolean>>(
    chatModels.reduce((acc, model) => ({ ...acc, [model.id]: false }), {}),
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const modelsToRevoke = Object.entries(selectedModels)
        .filter(([_, isSelected]) => isSelected)
        .map(([modelId]) => modelId)

      if (modelsToRevoke.length === 0) {
        return
      }

      await bulkSetTokenBudgetToZero({
        userIds,
        modelIds: modelsToRevoke,
      })

      onComplete()
    } catch (error) {
      console.error("Failed to revoke token budgets:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label>Select Models to Revoke</Label>
        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
          {chatModels.map((model) => (
            <div key={model.id} className="flex items-center space-x-2">
              <Checkbox
                id={`revoke-model-${model.id}`}
                checked={selectedModels[model.id]}
                onCheckedChange={(checked) => {
                  setSelectedModels((prev) => ({
                    ...prev,
                    [model.id]: !!checked,
                  }))
                }}
              />
              <Label htmlFor={`revoke-model-${model.id}`} className="text-sm">
                {model.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSelectedModels(chatModels.reduce((acc, model) => ({ ...acc, [model.id]: true }), {}))
          }}
          className="flex-1"
        >
          Select All
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSelectedModels(chatModels.reduce((acc, model) => ({ ...acc, [model.id]: false }), {}))
          }}
          className="flex-1"
        >
          Clear All
        </Button>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || Object.values(selectedModels).every((v) => !v)}
        variant="destructive"
        className="w-full"
      >
        {isSubmitting ? "Revoking..." : `Revoke Tokens from ${userIds.length} Users`}
      </Button>
    </form>
  )
}

interface TokenAllocationDialogProps {
  user: {
    id: string;
    email: string;
    modelUsage: {
      modelId: string;
      totalBudget: number;
      usedBudget: number;
    }[];
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TokenAllocationDialog({ user, open, onOpenChange }: TokenAllocationDialogProps) {
  const [editingModel, setEditingModel] = useState<string | null>(null);
  const [newAmount, setNewAmount] = useState("");
  const [loadingModelId, setLoadingModelId] = useState<string | null>(null);

  const handleAddTokens = async (modelId: string) => {
    if (!newAmount) return;
    try {
      setLoadingModelId(modelId);
      const current = user.modelUsage.find((m) => m.modelId === modelId);
      const total = (current?.totalBudget || 0) + Number.parseInt(newAmount);
      await upsertTokenBudget({ userId: user.id, modelId, totalBudget: total });
      toast.success(`${newAmount} tokens added to ${modelId}`);

      onOpenChange(false);
    } finally {
      setLoadingModelId(null);
    }
  };

  const handleRevoke = async (modelId: string) => {
    try {
      setLoadingModelId(modelId);
      await bulkSetTokenBudgetToZero({ userIds: [user.id], modelIds: [modelId] });

      toast.error(`Tokens revoked from ${modelId}`);
      onOpenChange(false);
    } finally {
      setLoadingModelId(null);
    }
  };

  const sortedModelUsage = [...(user.modelUsage || [])].sort((a, b) => {
    const aAvailable = a.totalBudget - a.usedBudget;
    const bAvailable = b.totalBudget - b.usedBudget;
  
    if (aAvailable !== bAvailable) {
      return bAvailable - aAvailable;
    }
  
    return b.totalBudget - a.totalBudget;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
<DialogContent
  className="max-w-lg p-0 max-h-[90vh] overflow-hidden"
  style={{ display: "flex", flexDirection: "column", height: "90vh" }}
>
  <div className="p-6 border-b sticky top-0 z-10 bg-background shrink-0">
    <DialogTitle className="text-lg font-semibold">
      Token Allocation for {user.email}
    </DialogTitle>
  </div>

  <div className="overflow-y-auto px-6 py-4 space-y-4 grow">
    {user.modelUsage?.length ? (
      sortedModelUsage.map((budget) => {
        const model = chatModels.find((m) => m.id === budget.modelId);
        const percent = Math.min(100, Math.floor((budget.usedBudget / budget.totalBudget) * 100)) || 0;
        const remaining = budget.totalBudget - budget.usedBudget;

        return (
          <div key={budget.modelId} className="border p-4 rounded-md space-y-2">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>{model?.name || budget.modelId}</span>
              <span className="text-muted-foreground">{percent}% used</span>
            </div>

            <div className="relative h-2 bg-muted-foreground/10 rounded-full">
              <div
                className="absolute top-0 left-0 h-2 bg-primary rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="text-xs text-muted-foreground mt-1">
              Total: <strong>{budget.totalBudget}</strong> | Used: <strong>{budget.usedBudget}</strong> | Remaining: <strong>{remaining}</strong>
            </div>

            <div className="flex items-center gap-2 mt-3">
              {editingModel === budget.modelId ? (
                <>
                  <Input
                    placeholder="Tokens"
                    type="number"
                    min="1"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-24"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleAddTokens(budget.modelId)}
                    disabled={loadingModelId === budget.modelId}
                  >
                    Add
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingModel(null)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingModel(budget.modelId)}
                  >
                    Add Tokens
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRevoke(budget.modelId)}
                    disabled={loadingModelId === budget.modelId}
                  >
                    Revoke
                  </Button>
                </>
              )}
            </div>
          </div>
        );
      })
    ) : (
      <p className="text-muted-foreground text-sm">No allocations found for this user.</p>
    )}
  </div>
</DialogContent>

    </Dialog>
  );
}
