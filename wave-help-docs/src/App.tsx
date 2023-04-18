import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme, Grid, Container } from '@mui/material';
import { DocEntry } from './models/Doc';
import Header from './components/Header';
import Menu from './components/Menu';
import { fetchDocs } from './utils/fetchDocs';
import Home from './pages/Home';

const App: React.FC = () => {
  const [docs, setDocs] = useState<DocEntry[]>([]);
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Header onTitleClick={handleTitleClick} menuItems={docs} />
      <Container maxWidth="lg" style={{ flexGrow: 1 }}>
        <Grid container spacing={isMobile ? 0 : 2}>
          {!isMobile && (
            <Grid item md={3}>
              <Menu onTitleClick={handleTitleClick} />
            </Grid>
          )}
          <Grid item xs={12} md={9}>
            <div
              style={{
                padding: isMobile ? '1rem 0' : '1rem',
              }}
            >
              <Home selectedTitleId={selectedTitleId} docs={docs} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
