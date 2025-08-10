import React, { useState } from 'react';
import Header   from './components/Header';
import Sidebar  from './components/Sidebar';
import QAList   from './components/QAList';

export type Category = 'all' | 'java' | 'springBoot' | 'cloud' | 'react' | 'angular';

const categories = [
  { key: 'all' as Category,        label: 'All' },
  { key: 'java' as Category,       label: 'JAVA' },
  { key: 'springBoot' as Category, label: 'Spring' },
  { key: 'cloud' as Category,      label: 'Cloud' },
  { key: 'react' as Category,      label: 'React' },
  { key: 'angular' as Category,    label: 'Angular' },
];

function App() {
  const [activeCat, setActiveCat] = useState<Category>('all');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Header onSearch={setSearchTerm} />
      <div className="layout">
        <Sidebar
          categories={categories}
          active={activeCat}
          onSelect={setActiveCat}
        />
        <QAList category={activeCat} searchTerm={searchTerm} />
      </div>
    </>
  );
}

export default App;