import React, { useState } from 'react';
import Header   from './components/Header';
import Sidebar  from './components/Sidebar';
import QAList   from './components/QAList';

export type Category = 'all' | 'java' | 'springBoot' | 'aws' | 'microservices' | 'react' | 'angular' | 'Kafka' | 'Management';

const categories = [
  { key: 'all' as Category,        label: 'All' },
  { key: 'java' as Category,       label: 'JAVA' },
  { key: 'springBoot' as Category, label: 'Spring' },
  { key: 'aws' as Category,      label: 'AWS' },
  { key: 'microservices' as Category,      label: 'Microservice Architecture' },
  { key: 'react' as Category,      label: 'React' },
  { key: 'angular' as Category,    label: 'Angular' },
  { key: 'kafka' as Category,    label: 'Kafka' },
  { key: 'management' as Category,    label: 'Management' }
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