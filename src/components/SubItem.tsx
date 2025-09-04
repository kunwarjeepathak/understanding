import React, { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import type { SubItemData } from '../data/qa-data';
import ImageModal from './ImageModal'; // Assuming you have this component

interface SubItemProps {
  item: SubItemData;
}

export default function SubItem({ item }: SubItemProps) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <li className={`sub-item${item.important ? ' important' : ''}`}>
      <button
        className="sub-header"
        onClick={() => setOpen(prev => !prev)}
      >
        <span className={item.important ? 'important-question' : ''}>
          {item.question}
        </span>
        <span className={`toggle-icon${open ? ' open' : ''}`}>▸</span>
      </button>

      {open && (
        <div className="sub-answer">
          <MarkdownRenderer content={item.answerMd} />

          {item.imageUrl && (
            <div className="qa-image-wrapper">
              <img
                src={
                  process.env.PUBLIC_URL +
                  '/assets/' +
                  (item.imageUrl?.replace('/assets/', '') || '')
                }
                alt="QA related"
                className="qa-image"
                style={{ cursor: 'pointer' }}
                onClick={() => setModalOpen(true)}
              />

              <ImageModal
                src={
                  modalOpen
                    ? process.env.PUBLIC_URL +
                      '/assets/' +
                      (item.imageUrl?.replace('/assets/', '') || '')
                    : ''
                }
                alt="QA related"
                onClose={() => setModalOpen(false)}
              />
            </div>
          )}
        </div>
      )}
    </li>
  );
}
