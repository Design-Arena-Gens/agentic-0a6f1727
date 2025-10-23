"use client";

import Image from 'next/image';
import { MessageSquare, Share2, Bookmark, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import { Comments } from './comments/Comments';

interface Article {
  id: string;
  title: string;
  source: string;
  summary: string;
  image: string;
  topic: string;
  url: string;
}

const demoArticles: Article[] = [
  {
    id: '1',
    title: 'Breakthrough in Renewable Energy Storage Promises 50% Efficiency Gains',
    source: 'Reuters',
    summary: 'Scientists unveil a new battery architecture that could transform grid storage and electric vehicles.',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop',
    topic: 'Technology',
    url: '#'
  },
  {
    id: '2',
    title: 'Global Markets Rally as Inflation Cools in Major Economies',
    source: 'BBC',
    summary: 'Investors cheer better-than-expected inflation data, with tech and energy leading gains.',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200&auto=format&fit=crop',
    topic: 'Business',
    url: '#'
  },
  {
    id: '3',
    title: 'Mars Lander Detects Unusual Seismic Activity Beneath Surface',
    source: 'AP',
    summary: 'New readings suggest complex geological processes at work, surprising mission scientists.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop',
    topic: 'Science',
    url: '#'
  }
];

export function Feed() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [openCommentsFor, setOpenCommentsFor] = useState<string | null>(null);

  const toggleSave = (id: string) => setSaved(prev => ({ ...prev, [id]: !prev[id] }));
  const upvote = (id: string) => setVotes(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  const downvote = (id: string) => setVotes(prev => ({ ...prev, [id]: (prev[id] ?? 0) - 1 }));

  return (
    <div className="space-y-4" aria-live="polite">
      {demoArticles.map(article => (
        <article key={article.id} className="card card-hover overflow-hidden" aria-labelledby={`title-${article.id}`}> 
          <div className="grid grid-cols-3 gap-0 sm:gap-4">
            <div className="col-span-3 sm:col-span-1 relative h-48 sm:h-full">
              <Image src={article.image} alt="" fill className="object-cover" />
            </div>
            <div className="col-span-3 sm:col-span-2 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-0.5 rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200">{article.topic}</span>
                <span aria-label="Source">{article.source}</span>
              </div>
              <h2 id={`title-${article.id}`} className="text-lg sm:text-xl font-semibold leading-snug">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{article.summary}</p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-3" aria-label="Interactions">
                  <button className="inline-flex items-center gap-1 text-sm" aria-pressed={(votes[article.id] ?? 0) > 0} onClick={() => upvote(article.id)}>
                    <ThumbsUp className="h-4 w-4" aria-hidden /> {votes[article.id] ?? 0}
                  </button>
                  <button className="inline-flex items-center gap-1 text-sm" aria-pressed={(votes[article.id] ?? 0) < 0} onClick={() => downvote(article.id)}>
                    <ThumbsDown className="h-4 w-4" aria-hidden />
                  </button>
                  <button className="inline-flex items-center gap-1 text-sm" onClick={() => setOpenCommentsFor(prev => prev === article.id ? null : article.id)} aria-controls={`comments-${article.id}`} aria-expanded={openCommentsFor === article.id}>
                    <MessageSquare className="h-4 w-4" aria-hidden />
                    Comments
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center gap-1 text-sm" onClick={() => toggleSave(article.id)} aria-pressed={!!saved[article.id]} aria-label={saved[article.id] ? 'Unsave' : 'Save for later'}>
                    <Bookmark className={`h-4 w-4 ${saved[article.id] ? 'fill-current' : ''}`} aria-hidden />
                  </button>
                  <button className="inline-flex items-center gap-1 text-sm" onClick={() => navigator.share?.({ title: article.title, url: article.url })}>
                    <Share2 className="h-4 w-4" aria-hidden /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {openCommentsFor === article.id && (
            <div id={`comments-${article.id}`} className="border-t border-gray-100 dark:border-gray-700 p-4">
              <Comments articleId={article.id} />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
