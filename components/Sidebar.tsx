"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const topics = ['World', 'Business', 'Technology', 'Science', 'Health', 'Sports', 'Entertainment', 'Politics'];
const sources = ['Reuters', 'AP', 'BBC', 'NYTimes', 'The Verge', 'WSJ'];

export function Sidebar() {
  const [open, setOpen] = useState<{topics: boolean; sources: boolean}>({ topics: true, sources: true });

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Pulse</h1>

      <section aria-labelledby="topics" className="card">
        <header className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700">
          <h2 id="topics" className="text-sm font-medium">Topics</h2>
          <button className="p-1" aria-expanded={open.topics} onClick={() => setOpen(v => ({...v, topics: !v.topics}))}>
            <ChevronDown className={`h-4 w-4 transition-transform ${open.topics ? '' : '-rotate-90'}`} aria-hidden />
            <span className="sr-only">Toggle topics</span>
          </button>
        </header>
        {open.topics && (
          <ul className="p-2 grid grid-cols-2 gap-2">
            {topics.map(topic => (
              <li key={topic}>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary-600" defaultChecked={['World','Technology'].includes(topic)} />
                  {topic}
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="sources" className="card">
        <header className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700">
          <h2 id="sources" className="text-sm font-medium">Sources</h2>
          <button className="p-1" aria-expanded={open.sources} onClick={() => setOpen(v => ({...v, sources: !v.sources}))}>
            <ChevronDown className={`h-4 w-4 transition-transform ${open.sources ? '' : '-rotate-90'}`} aria-hidden />
            <span className="sr-only">Toggle sources</span>
          </button>
        </header>
        {open.sources && (
          <ul className="p-2 grid grid-cols-1 gap-2">
            {sources.map(s => (
              <li key={s}>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary-600" defaultChecked={['Reuters','BBC'].includes(s)} />
                  {s}
                </label>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="text-xs text-gray-500 dark:text-gray-400">
        <p>Customize your feed by selecting preferred topics and sources.</p>
      </section>
    </div>
  );
}
