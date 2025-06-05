"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requestMoreTokens } from "@/app/(chat)/actions"

interface TokenBudgetDisplayProps {
  modelId: string
  availableTokens: number
  usedTokens: number
  onBudgetUpdate?: () => void
}

export function TokenBudgetDisplay({ modelId, availableTokens, usedTokens, onBudgetUpdate }: TokenBudgetDisplayProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [requestAmount, setRequestAmount] = useState("10000")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const remainingTokens = availableTokens - usedTokens
  const percentUsed = availableTokens > 0 ? (usedTokens / availableTokens) * 100 : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await requestMoreTokens({
        modelId,
        requestedAmount: Number.parseInt(requestAmount),
      })
      setIsDialogOpen(false)
      // Trigger parent component to refresh token budget
      onBudgetUpdate?.()
    } catch (error) {
      console.error("Failed to request tokens:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span>Token Budget:</span>
          <span>
            {remainingTokens.toLocaleString()} / {availableTokens.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
          <div className="bg-primary h-full" style={{ width: `${Math.min(percentUsed, 100)}%` }} />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Request More
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request More Tokens</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="tokenAmount">Token Amount</Label>
              <Input
                id="tokenAmount"
                type="number"
                value={requestAmount}
                onChange={(e) => setRequestAmount(e.target.value)}
                min="1000"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
