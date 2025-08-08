import React from 'react';
import QAMainItem from './components/QAMainItem';
import data from './data/qas.json';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Q&A Hub</h1>
      {data.map((item, idx) => (
        <QAMainItem key={idx} item={item} />
      ))}
    </div>
  );
}

export default App;
