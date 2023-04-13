
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { Box, Grid } from '@mui/material';
import Menu from './components/Menu';
import Header from './components/Header';


function App() {
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);

  const handleTitleClick = (id: string) => {
    setSelectedTitleId(id);
  };

  return (
    <Router>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header onTitleClick={handleTitleClick} />
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={3} lg={2}>
                <Menu onTitleClick={handleTitleClick} />
              </Grid>
              <Grid item xs={12} md={9} lg={10}>
                <Box flexGrow={1} mt={4}>
                  <Routes>
                    <Route
                      path="/"
                      element={<Home selectedTitleId={selectedTitleId} />}
                    />
                    {/* <Route path="/about" element={<AboutPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/contact" element={<ContactPage />} /> */}
                  </Routes>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Router>
  );
}

export default App;
