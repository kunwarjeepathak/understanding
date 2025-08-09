
// src/components/SubItem.tsx
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm      from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import mermaid        from 'mermaid';

import type { SubItemData } from '../data/qa-data';

interface SubItemProps {
  item: SubItemData;
}

export default function SubItem({ item }: SubItemProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // On open, render any <div class="mermaid"> blocks
  useEffect(() => {
    if (open && containerRef.current) {
      mermaid.initialize({ startOnLoad: false });
      mermaid.init(undefined, containerRef.current.querySelectorAll('.mermaid'));
    }
  }, [open]);

  return (
    <li>
      <button className="sub-header" onClick={() => setOpen(prev => !prev)}>
        <span>{item.question}</span>
        <span className={`toggle-icon${open ? ' open' : ''}`}>▸</span>
      </button>

      {open && (
        <div className="sub-answer" ref={containerRef}>
          <ReactMarkdown
            children={item.answerMd}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const lang = match ? match[1] : '';

                if (!inline && lang === 'mermaid') {
                  // Render raw Mermaid container
                  return (
                    <div className="mermaid">
                      {String(children).trim()}
                    </div>
                  );
                }

                // Fallback: normal code block
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          />
        </div>
      )}
    </li>
  );
}
