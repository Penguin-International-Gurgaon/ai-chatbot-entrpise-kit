"use client"

import { useEffect, useState, useCallback } from "react"
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { ModelSelector } from "@/components/model-selector"
import { VisibilitySelector } from "@/components/visibility-selector"
import { TokenBudgetDisplay } from "@/components/token-budget-display"
import { getTokenBudgetForModel } from "@/app/(chat)/actions"

export interface ChatHeaderRef {
  refreshTokenBudget: () => Promise<void>
}

export function ChatHeader({
  id,
  title,
  selectedChatModel,
  selectedVisibilityType,
  isReadonly,
  onChatModelChange,
  onVisibilityChange,
  ref,
}: {
  id: string
  title?: string
  selectedChatModel: string
  selectedVisibilityType: string
  isReadonly: boolean
  onChatModelChange?: (model: string) => void
  onVisibilityChange?: (visibility: string) => void
  ref?: React.Ref<ChatHeaderRef>
}) {
  const { state, openMobile } = useSidebar()
  const [tokenBudget, setTokenBudget] = useState<{ totalBudget: number; usedBudget: number } | null>(null)

  const fetchTokenBudget = useCallback(async () => {
    try {
      const budget = await getTokenBudgetForModel(selectedChatModel)
      setTokenBudget(budget)
    } catch (error) {
      console.error("Failed to fetch token budget:", error)
    }
  }, [selectedChatModel])

  useEffect(() => {
    fetchTokenBudget()
  }, [fetchTokenBudget])

  // Expose methods to parent via ref (React 19 style)
  useEffect(() => {
    if (ref && typeof ref === 'function') {
      ref({ refreshTokenBudget: fetchTokenBudget })
    } else if (ref && typeof ref === 'object' && ref !== null) {
      // @ts-ignore - React 19 allows assignment to ref.current
      ref.current = { refreshTokenBudget: fetchTokenBudget }
    }
  }, [fetchTokenBudget, ref])

  const shouldShowSidebarTrigger = state === "collapsed" || !openMobile

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 border-b bg-background sm:px-6">
      <div className="flex flex-wrap items-center gap-3">
        {/* ✅ Show only if collapsed or closed on mobile */}
        {shouldShowSidebarTrigger && (
          <SidebarTrigger className="block md:content" />
        )}

        <div className="flex flex-wrap items-center gap-3">
          <ModelSelector selectedModelId={selectedChatModel} onChange={onChatModelChange} />
          {!isReadonly && (
            <VisibilitySelector
              selectedVisibilityType={selectedVisibilityType}
              onChange={onVisibilityChange}
            />
          )}
        </div>
      </div>

      {tokenBudget && (
        <TokenBudgetDisplay
          modelId={selectedChatModel}
          availableTokens={tokenBudget.totalBudget}
          usedTokens={tokenBudget.usedBudget}
          onBudgetUpdate={fetchTokenBudget}
        />
      )}
    </header>
  )
}
