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

  const [adminDocs, setAdminDocs] = useState<DocEntry[]>([]);
  const [restaurantDocs, setRestaurantDocs] = useState<DocEntry[]>([]);
  const [endUserDocs, setEndUserDocs] = useState<DocEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDocs();
      setDocs(data);

      // Categorize docs
      const admins = data.filter(doc => doc.fields.isAdminDoc);
      const restaurants = data.filter(doc => doc.fields.isRestaurantDoc);
      const endUsers = data.filter(doc => doc.fields.isCustomerDoc);

      setAdminDocs(admins);
      setRestaurantDocs(restaurants);
      setEndUserDocs(endUsers);
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
        <div style={{ display: 'flex' }}>
          {!isMobile && (
            <div style={{ minWidth: '250px', height: '100vh', position: 'sticky', top: 0 }}>
              <Menu
                onTitleClick={handleTitleClick}
                adminDocs={adminDocs}
                restaurantDocs={restaurantDocs}
                endUserDocs={endUserDocs}
              />
            </div>
          )}
          <div style={{ flex: 1, marginLeft: isMobile ? '0' : '20px' }}>
            <Grid container spacing={isMobile ? 0 : 2}>
              <Grid item xs={12}>
                <div style={{ padding: isMobile ? '1rem 0' : '1rem' }}>
                  <Home selectedTitleId={selectedTitleId} docs={docs} />
                </div>
              </Grid>
            </Grid>
          </div>

        </div>
      </Container>

    </div>
  );
};

export default App;
