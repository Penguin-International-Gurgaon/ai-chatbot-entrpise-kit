'use client';

import { startTransition, useMemo, useOptimistic, useState } from 'react';

import { saveChatModelAsCookie } from '@/app/(chat)/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { chatModels } from '@/lib/ai/models';
import { cn } from '@/lib/utils';

import { CheckCircleFillIcon, ChevronDownIcon } from './icons';

export function ModelSelector({
  selectedModelId,
  className,
  onChange,
}: {
  selectedModelId: string;
  onChange?: (modelId: string) => void
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState(false);
  const [optimisticModelId, setOptimisticModelId] =
    useOptimistic(selectedModelId);

  const selectedChatModel = useMemo(
    () => chatModels.find((chatModel) => chatModel.id === optimisticModelId),
    [optimisticModelId],
  );

  // Group models by provider
  const groupedModels = useMemo(() => {
    const providers = {
      openai: [] as typeof chatModels,
      anthropic: [] as typeof chatModels,
    };
    for (const model of chatModels) {
      if (model.provider === 'openai') providers.openai.push(model);
      else if (model.provider === 'anthropic') providers.anthropic.push(model);
    }
    return providers;
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button
          data-testid="model-selector"
          variant="outline"
          className="md:px-2 md:h-[34px]"
        >
          {selectedChatModel?.name}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[300px] max-h-[400px] overflow-y-auto">
        <ModelGroup
          title="OpenAI Models"
          models={groupedModels.openai}
          currentId={optimisticModelId}
          onSelect={id => {
            setOpen(false);
            startTransition(() => {
              setOptimisticModelId(id);
              saveChatModelAsCookie(id);
              if (onChange) {
                onChange(id)
              }
            });
          }}
        />
        <ModelGroup
          title="Anthropic Models"
          models={groupedModels.anthropic}
          currentId={optimisticModelId}
          onSelect={id => {
            setOpen(false);
            startTransition(() => {
              setOptimisticModelId(id);
              saveChatModelAsCookie(id);
              if (onChange) {
                onChange(id)
              }
            });
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ModelGroup({
  title,
  models,
  currentId,
  onSelect,
}: {
  title: string;
  models: typeof chatModels;
  currentId: string;
  onSelect: (id: string) => void;
}) {
  if (models.length === 0) return null;

  return (
    <>
      <div className="px-3 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </div>
      {models.map(({ id, name, description }) => (
        <DropdownMenuItem
          key={id}
          data-testid={`model-selector-item-${id}`}
          onSelect={() => onSelect(id)}
          data-active={id === currentId}
          asChild
        >
          <button
            type="button"
            className="gap-4 group/item flex flex-row justify-between items-center w-full"
          >
            <div className="flex flex-col gap-1 items-start text-left">
              <div>{name}</div>
              <div className="text-xs text-muted-foreground">{description}</div>
            </div>
            <div className="text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100">
              <CheckCircleFillIcon />
            </div>
          </button>
        </DropdownMenuItem>
      ))}
    </>
  );
}
