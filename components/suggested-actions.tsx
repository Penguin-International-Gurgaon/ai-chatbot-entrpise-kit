'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import useSWR from 'swr';

const fetcher = async (url: string) : Promise<any> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error (`Failed to fetch suggestions : ${response.status}`);
  } 
  return response.json();
}

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const {data} = useSWR('/api/config', fetcher);
  
  if (!data?.suggested_actions) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-2 w-full">
      {data.suggested_actions.map((s: any, i: number) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * i }}
          key={`suggested-${s.id || s.title || i}`}
          className={i > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: s.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{s.title}</span>
            <span className="text-muted-foreground">
              {s.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
