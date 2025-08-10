import React from 'react';

interface HeaderProps {
  onSearch: (term: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header>
      <div className="logo">Understand and Clear Concepts in Story telling format</div>
      <input
        type="search"
        placeholder="Search questions..."
        aria-label="Search questions"
        onChange={e => onSearch(e.target.value)}
      />
    </header>
  );
}