// src/components/SubItem.tsx

import React, { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import type { SubItemData } from '../data/qa-data';

interface SubItemProps {
  item: SubItemData;
}

export default function SubItem({ item }: SubItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <button
        className="sub-header"
        onClick={() => setOpen(prev => !prev)}
      >
        <span>{item.question}</span>
        <span className={`toggle-icon${open ? ' open' : ''}`}>▸</span>
      </button>

      {open && (
        <div className="sub-answer">
          <MarkdownRenderer content={item.answerMd} />
        </div>
      )}
    </li>
  );
}