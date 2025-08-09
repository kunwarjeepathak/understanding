import React from 'react';
import QACard from './QACard';
import data from '../data/qa-data';
import { QACardData } from '../data/qa-data';

interface QAListProps {
  category: string;
  searchTerm: string;
}

export default function QAList({ category, searchTerm }: QAListProps) {
  const filtered = (data as QACardData[]).filter(card => {
    const inCategory = category === 'all' || card.category === category;
    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.subItems.some(si =>
        si.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return inCategory && matchesSearch;
  });

  return (
    <main className="content">
      {filtered.map(card => (
        <QACard key={card.title} card={card} />
      ))}
    </main>
  );
}