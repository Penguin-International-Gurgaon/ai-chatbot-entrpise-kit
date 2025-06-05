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

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="w-full border-t px-4 py-3 text-sm text-muted-foreground flex justify-between items-center flex-wrap gap-2">
      <div>
        Powered by <span className="font-semibold text-primary">PenguinOne</span>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="underline underline-offset-4 text-primary hover:text-primary/80 text-xs sm:text-sm">
          Privacy & Guidelines
        </DialogTrigger>

        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>PenguinOne Usage Policy</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="privacy" className="mt-4 w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="privacy">Privacy Notice</TabsTrigger>
              <TabsTrigger value="guidelines">LLM Guidelines</TabsTrigger>
            </TabsList>

            <TabsContent value="privacy" className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                This LLM-based chat application is provided by <strong>Penguin International</strong> for the sole use of employees to support daily work tasks, idea generation, communication assistance, and productivity enhancement.
              </p>
              <p>
                To ensure responsible usage and maintain operational integrity, the platform is monitored. Monitoring may include system-level logs, usage patterns, and anonymized metadata. This helps:
              </p>
              <ul className="list-disc list-inside ml-4">
                <li>Prevent misuse or abuse of the service</li>
                <li>Ensure equitable access for all employees</li>
                <li>Uphold organizational standards of conduct</li>
              </ul>
              <p>
                Please note: <strong>Penguin International does not access the content of your conversations unless a review is triggered by a security or policy concern</strong>.
              </p>
              <p>
                This tool is part of our broader initiative to empower employees to explore and adopt LLM tools responsibly and effectively. We&apos;re committed to creating a safe, secure, and supportive environment to encourage widespread and innovative use of AI technology across the organization.
              </p>
            </TabsContent>

            <TabsContent value="guidelines" className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <div>
                <strong>General LLM Usage Guidelines:</strong>
                <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                  <li>LLMs can occasionally be wrong — always verify outputs.</li>
                  <li>Use critical thinking before acting on any result.</li>
                  <li>Never share sensitive, confidential, or personal data.</li>
                </ul>
              </div>

              <div>
                <strong>Ethical Use:</strong> Avoid generating content that is inappropriate, offensive, misleading, discriminatory, or in violation of Penguin International’s code of conduct.
              </div>

              <div>
                <strong>On AI and Human Thinking:</strong> Excessive dependence on LLMs can impact creativity and original thinking. Use this tool as an assistant — not a substitute — for research, ideation, and communication.
              </div>

              <div>
                <strong>Need Help?</strong> Reach out for help with your experiments and learn responsibly.
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
