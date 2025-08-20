import React, { useState } from 'react';
import Header   from './components/Header';
import Sidebar  from './components/Sidebar';
import QAList   from './components/QAList';

export type Category = 'all' | 'java' | 'systemDesign' | 'springBoot' | 'cloud' | 'devOps' |'kafka' | 'aws' | 'azure' | 'javascript' |'react' | 'angular'| 'database' | 'leadership'| 'communication';

const categories = [
  { key: 'all' as Category,        label: 'All' },
  { key: 'java' as Category,       label: 'JAVA' },
  { key: 'systemDesign' as Category,       label: 'SystemDesign' },
  { key: 'springBoot' as Category, label: 'Spring' },
  { key: 'cloud' as Category,      label: 'Cloud' },
  { key: 'devOps' as Category,      label: 'DevOps' },
  { key: 'kafka' as Category,      label: 'Kafka' },
  { key: 'aws' as Category,      label: 'AWS' },
  { key: 'azure' as Category,      label: 'Azure' },
  { key: 'javascript' as Category,      label: 'Javascript and TypeScript' },
  { key: 'react' as Category,      label: 'React' },
  { key: 'angular' as Category,    label: 'Angular' },
  { key: 'database' as Category,    label: 'DataBase' },
  { key: 'leadership' as Category,    label: 'Leadership' },
  { key: 'communication' as Category,    label: 'Communication' },
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