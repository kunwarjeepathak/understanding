import React from 'react';

interface HeaderProps {
  onSearch: (term: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header>
      <div className="logo">Q&amp;A Hub</div>
      <input
        type="search"
        placeholder="Search questions..."
        aria-label="Search questions"
        onChange={e => onSearch(e.target.value)}
      />
    </header>
  );
}