"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Home, Search, User } from 'lucide-react';
import { cn } from '@/lib/cn';

const items = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/notifications', label: 'Alerts', icon: Bell },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-800 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/70">
      <ul className="grid grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                'flex flex-col items-center justify-center py-2 text-xs focus-visible:outline-none',
                pathname === href ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
              )}
            >
              <Icon aria-hidden className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
