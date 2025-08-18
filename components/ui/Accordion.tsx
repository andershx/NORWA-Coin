'use client';
import { useState } from 'react';

type Item = { id: string; title: string; content: React.ReactNode };

export default function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="divide-y divide-[#252b40] rounded-xl border border-[#252b40] bg-[#0f1422]">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id}>
            <button
              onClick={() => setOpen(isOpen ? null : it.id)}
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-[#121a2b]"
            >
              <span className="font-medium">{it.title}</span>
              <span className="text-sm" style={{color:'var(--muted)'}}>{isOpen ? '—' : '+'}</span>
            </button>
            {isOpen && <div className="px-4 pb-4">{it.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
