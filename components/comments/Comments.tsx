"use client";

import { useState } from 'react';

interface CommentNode {
  id: string;
  author: string;
  text: string;
  children?: CommentNode[];
}

const demoThreads: CommentNode[] = [
  {
    id: 'c1',
    author: 'Alex',
    text: 'This could really change EV adoption timelines.',
    children: [
      { id: 'c1-1', author: 'Sam', text: 'Grid stability will be the key factor.' },
      { id: 'c1-2', author: 'Riley', text: 'Curious about lifecycle emissions.' },
    ],
  },
  {
    id: 'c2',
    author: 'Jordan',
    text: 'Markets reacting quickly might be over-optimistic.',
  },
];

export function Comments({ articleId }: { articleId: string }) {
  const [threads, setThreads] = useState<CommentNode[]>(demoThreads);
  const [input, setInput] = useState('');

  const addComment = () => {
    if (!input.trim()) return;
    setThreads(prev => [{ id: `${Date.now()}`, author: 'You', text: input }, ...prev]);
    setInput('');
  };

  const addReply = (id: string, reply: string) => {
    if (!reply.trim()) return;
    const clone = structuredClone(threads) as CommentNode[];
    const recurse = (nodes: CommentNode[]): boolean => {
      for (const node of nodes) {
        if (node.id === id) {
          node.children = [{ id: `${Date.now()}`, author: 'You', text: reply }, ...(node.children ?? [])];
          return true;
        }
        if (node.children && recurse(node.children)) return true;
      }
      return false;
    };
    recurse(clone);
    setThreads(clone);
  };

  return (
    <div className="space-y-3" aria-label={`Comments for article ${articleId}`}>
      <div className="flex items-start gap-2">
        <label htmlFor={`comment-${articleId}`} className="sr-only">Add a comment</label>
        <textarea
          id={`comment-${articleId}`}
          className="flex-1 p-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          rows={2}
          placeholder="Add a comment"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="px-3 py-2 rounded-md bg-primary-600 text-white disabled:opacity-50" onClick={addComment} disabled={!input.trim()}>Post</button>
      </div>

      <ul className="space-y-3">
        {threads.map(node => (
          <Thread key={node.id} node={node} onReply={addReply} />
        ))}
      </ul>
    </div>
  );
}

function Thread({ node, onReply }: { node: CommentNode; onReply: (id: string, reply: string) => void }) {
  const [open, setOpen] = useState(true);
  const [reply, setReply] = useState('');

  return (
    <li className="border-l-2 border-gray-200 dark:border-gray-700 pl-3">
      <div className="flex items-start justify-between">
        <p className="text-sm"><span className="font-medium">{node.author}</span> <span className="text-gray-600 dark:text-gray-300">{node.text}</span></p>
        {node.children?.length ? (
          <button className="text-xs text-primary-600 dark:text-primary-400" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? 'Hide' : 'Show'} replies ({node.children.length})
          </button>
        ) : null}
      </div>

      <div className="mt-2 flex items-start gap-2">
        <input
          aria-label="Reply"
          className="flex-1 p-2 rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          placeholder="Reply"
          value={reply}
          onChange={e => setReply(e.target.value)}
        />
        <button className="px-3 py-1.5 rounded-md bg-accent-500 text-white disabled:opacity-50" onClick={() => { onReply(node.id, reply); setReply(''); }} disabled={!reply.trim()}>Reply</button>
      </div>

      {open && node.children && (
        <ul className="mt-2 space-y-2">
          {node.children.map(child => (
            <Thread key={child.id} node={child} onReply={onReply} />
          ))}
        </ul>
      )}
    </li>
  );
}
