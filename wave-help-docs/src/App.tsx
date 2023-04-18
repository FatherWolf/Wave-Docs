import React, { useState, useEffect } from 'react';
import { DocEntry } from './models/Doc';
import Header from './components/Header';
import Menu from './components/Menu';
import { fetchDocs } from './utils/fetchDocs';
import Home from './pages/Home';

const App: React.FC = () => {
  const [docs, setDocs] = useState<DocEntry[]>([]);
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDocs();
      setDocs(data);
    };

    fetchData();
  }, []);

  const handleTitleClick = (id: string) => {
    setSelectedTitleId(id);
  };

  return (
    <div>
      <Header onTitleClick={handleTitleClick} menuItems={docs} />
      <Menu onTitleClick={handleTitleClick} />
      <Home selectedTitleId={selectedTitleId} docs={docs} />
    </div>
  );
};

export default App;
