import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Unlimited Approval Diff Tracker',
  description: 'Approval exposure observability across Ethereum and Arbitrum'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">
              Unlimited Approval Diff Tracker
            </h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
