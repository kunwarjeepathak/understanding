import React, { useState } from 'react';
import Header   from './components/Header';
import Sidebar  from './components/Sidebar';
import QAList   from './components/QAList';

export type Category = 'all' | 'java' | 'systemDesign' | 'springBoot' | 'cloud' | 'devOps' |'kafka' | 'aws' | 'azure' | 'javascript' |'react' | 'angular'| 'database' | 'python' | 'golang' | 'leadership'| 'communication' | 'JPMCQuestions';

const categories = [
  { key: 'all' as Category,        label: 'All' },
  { key: 'java' as Category,       label: 'JAVA Architect' },
  { key: 'systemDesign' as Category,       label: 'System Design Architect' },
  { key: 'springBoot' as Category, label: 'Spring' },
  { key: 'cloud' as Category,      label: 'Cloud Architect' },
  { key: 'devOps' as Category,      label: 'DevOps Architect' },
  { key: 'kafka' as Category,      label: 'Kafka' },
  { key: 'aws' as Category,      label: 'AWS' },
  { key: 'azure' as Category,      label: 'Azure' },
  { key: 'javascript' as Category,      label: 'Javascript and TypeScript' },
  { key: 'react' as Category,      label: 'React' },
  { key: 'angular' as Category,    label: 'Angular' },
  { key: 'database' as Category,    label: 'DB Architect' },
  { key: 'python' as Category,    label: 'Python' },
  { key: 'golang' as Category,    label: 'Golang' },
  { key: 'leadership' as Category,    label: 'Leadership' },
  { key: 'communication' as Category,    label: 'Communication' },
  { key: 'JPMQuestions' as Category,    label: 'JPMC questions' }
];

function App() {
  const [activeCat, setActiveCat] = useState<Category>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  React.useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <>
      <Header onSearch={setSearchTerm} />

      <div style={{ padding: '0.5rem 1rem' }}>
        <button
          style={{
            float: 'right',
            marginBottom: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            background: darkMode ? '#444' : '#eee',
            color: darkMode ? '#fff' : '#222',
            cursor: 'pointer',
          }}
          onClick={() => setDarkMode((dm) => !dm)}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

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