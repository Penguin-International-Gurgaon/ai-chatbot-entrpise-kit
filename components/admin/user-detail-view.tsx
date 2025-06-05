"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { updateUserTokenBudget, setTokenBudgetToZero } from "@/app/admin/actions"
import type { UserTokenUsage } from "@/lib/db/schema"

interface UserDetailViewProps {
  userData: UserTokenUsage
}

export function UserDetailView({ userData }: UserDetailViewProps) {
  const [isMultiModelDialogOpen, setIsMultiModelDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.totalTokensUsed.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userData.lastActive ? new Date(userData.lastActive).toLocaleDateString() : "Never"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Models Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.modelUsage.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Token Budget by Model</h3>
        <Dialog open={isMultiModelDialogOpen} onOpenChange={setIsMultiModelDialogOpen}>
          <DialogTrigger asChild>
            <Button>Assign Multiple Models</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Tokens to Multiple Models</DialogTitle>
            </DialogHeader>
            <MultiModelTokenForm
              userId={userData.id}
              models={userData.modelUsage.map((m) => m.modelId)}
              onComplete={() => setIsMultiModelDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Total Budget</TableHead>
              <TableHead>Used</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.modelUsage.map((model) => (
              <TableRow key={model.modelId}>
                <TableCell className="font-medium">{model.modelId}</TableCell>
                <TableCell>{model.totalBudget.toLocaleString()}</TableCell>
                <TableCell>{model.usedBudget.toLocaleString()}</TableCell>
                <TableCell>{(model.totalBudget - model.usedBudget).toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <TokenAdjustForm userId={userData.id} modelId={model.modelId} currentBudget={model.totalBudget} />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setTokenBudgetToZero({ userId: userData.id, modelId: model.modelId })}
                    >
                      Set to Zero
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Token Usage by Model</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={userData.modelUsage.map((model) => ({
                modelId: model.modelId,
                tokensUsed: model.usedBudget,
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="modelId" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} tokens`, "Usage"]} />
              <Legend />
              <Bar dataKey="tokensUsed" fill="#8884d8" name="Tokens Used" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function TokenAdjustForm({
  userId,
  modelId,
  currentBudget,
}: {
  userId: string
  modelId: string
  currentBudget: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [tokenAmount, setTokenAmount] = useState(currentBudget.toString())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateUserTokenBudget({
        userId,
        modelId,
        totalBudget: Number.parseInt(tokenAmount),
      })
      setIsOpen(false)
    } catch (error) {
      console.error("Failed to update token budget:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Adjust
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust Token Budget for {modelId}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="tokens">Token Budget</Label>
            <Input
              id="tokens"
              type="number"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              min="0"
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Updating..." : "Update Budget"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function MultiModelTokenForm({
  userId,
  models,
  onComplete,
}: {
  userId: string
  models: string[]
  onComplete: () => void
}) {
  const [tokenAmount, setTokenAmount] = useState("10000")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedModels, setSelectedModels] = useState<Record<string, boolean>>(
    models.reduce((acc, model) => ({ ...acc, [model]: false }), {}),
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const modelsToUpdate = Object.entries(selectedModels)
        .filter(([_, isSelected]) => isSelected)
        .map(([modelId]) => modelId)

      if (modelsToUpdate.length === 0) {
        return
      }

      await Promise.all(
        modelsToUpdate.map((modelId) =>
          updateUserTokenBudget({
            userId,
            modelId,
            totalBudget: Number.parseInt(tokenAmount),
          }),
        ),
      )

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
        <Label htmlFor="multi-tokens">Token Budget for Selected Models</Label>
        <Input
          id="multi-tokens"
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label>Select Models</Label>
        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
          {models.map((modelId) => (
            <div key={modelId} className="flex items-center space-x-2">
              <Checkbox
                id={`model-${modelId}`}
                checked={selectedModels[modelId]}
                onCheckedChange={(checked) => {
                  setSelectedModels((prev) => ({
                    ...prev,
                    [modelId]: !!checked,
                  }))
                }}
              />
              <Label htmlFor={`model-${modelId}`} className="text-sm">
                {modelId}
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
            setSelectedModels(models.reduce((acc, model) => ({ ...acc, [model]: true }), {}))
          }}
          className="flex-1"
        >
          Select All
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setSelectedModels(models.reduce((acc, model) => ({ ...acc, [model]: false }), {}))
          }}
          className="flex-1"
        >
          Clear All
        </Button>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Updating..." : "Update Selected Models"}
      </Button>
    </form>
  )
}
