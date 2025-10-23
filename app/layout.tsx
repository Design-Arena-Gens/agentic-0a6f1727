import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { BottomNav } from '@/components/BottomNav';
import { Sidebar } from '@/components/Sidebar';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Pulse - News & Discussion',
  description: 'Responsive news-focused social platform',
  icons: {
    icon: '/icon.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/manifest.json'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <div className="flex">
              <aside className="hidden lg:block lg:w-72 border-r border-gray-200 dark:border-gray-800 min-h-screen">
                <Sidebar />
              </aside>
              <main className="flex-1 min-h-screen pb-20">
                {children}
              </main>
            </div>
            <BottomNav />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
