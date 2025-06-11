'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import useSWR from 'swr';
import ReactMarkdown from 'react-markdown';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch config');
  return response.json();
};

export default function Footer() {
  const [open, setOpen] = useState(false);
  const { data } = useSWR('/api/config', fetcher);

  if (!data?.footer?.enabled) return null;

  return (
    <footer className="w-full border-t px-2 py-2 text-xs text-muted-foreground/60 flex justify-between items-center flex-wrap gap-2">
      <div>
        {data.footer.text}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="underline underline-offset-4 text-primary hover:text-primary/80 text-xs">
          Privacy & Guidelines
        </DialogTrigger>

        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy & Usage Policy</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="privacy" className="mt-4 w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="privacy">Privacy Notice</TabsTrigger>
              <TabsTrigger value="guidelines">LLM Guidelines</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy" className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <ReactMarkdown>{data?.footer?.privacy_policy || 'No privacy policy configured.'}</ReactMarkdown>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <ReactMarkdown>{data?.footer?.usage_policy || 'No usage policy configured.'}</ReactMarkdown>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </footer>
  );
}