import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

import { getAppConfig } from '@/lib/config';
import './globals.css';

const config = getAppConfig();

export const metadata: Metadata = {
  title: config.layout.title,
  description: config.layout.description,
  icons: {
    icon: `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${config.header.favicon}</text></svg>`
  }
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geist.variable} ${geistMono.variable}`}
      >
        <head>
          {/* Dynamically render meta tags */}
          {Object.entries(config.header)
            .filter(([key]) => !['favicon', 'title', 'subtitle'].includes(key))
            .map(([key, value]) => (
              <meta key={key} name={key} content={value} />
            ))}
        </head>
        <body className="antialiased">
          <ThemeProvider
            attribute="class" // adds `light` or `dark` class to <html> or <body>
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>

  );
}
