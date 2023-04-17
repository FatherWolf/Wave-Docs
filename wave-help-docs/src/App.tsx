import React, { useState, useEffect } from 'react';
import { Entry } from 'contentful';
import { Doc, DocEntry } from './models/Doc';
import Header from './components/Header';
import Menu from './components/Menu';
import { fetchDocs } from './utils/fetchDocs';

const App: React.FC = () => {
  const [docs, setDocs] = useState<DocEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDocs();
      setDocs(data);
    };

    fetchData();
  }, []);

  const handleTitleClick = (id: string) => {
    console.log('Clicked:', id);
  };

  return (
    <div>
      <Header onTitleClick={handleTitleClick} menuItems={docs} />
      <Menu onTitleClick={handleTitleClick} />
    </div>
  );
};

export default App;
