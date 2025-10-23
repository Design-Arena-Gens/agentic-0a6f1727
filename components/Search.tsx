"use client";

import { useState } from 'react';

export function Search() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const run = () => {
    const pool = ['Renewable Energy', 'Inflation Cools', 'Mars Lander'];
    setResults(pool.filter(x => x.toLowerCase().includes(q.toLowerCase())));
  };

  return (
    <section className="space-y-4">
      <div className="card p-4">
        <label htmlFor="q" className="text-sm">Search articles</label>
        <div className="mt-1 flex items-center gap-2">
          <input id="q" value={q} onChange={e => setQ(e.target.value)} className="flex-1 p-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" placeholder="Keywords, topics, sources" />
          <button className="px-3 py-2 rounded-md bg-primary-600 text-white" onClick={run}>Search</button>
        </div>
      </div>

      <div className="space-y-2" role="status" aria-live="polite">
        {results.map(r => (
          <div key={r} className="card p-3">{r}</div>
        ))}
        {!results.length && <p className="text-sm text-gray-600 dark:text-gray-300">Try searching for "energy"</p>}
      </div>
    </section>
  );
}
