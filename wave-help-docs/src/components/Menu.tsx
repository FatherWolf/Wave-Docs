import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { DocEntry } from '../models/Doc';
import { fetchDocs } from '../utils/fetchDocs';

interface MenuProps {
  onTitleClick: (id: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onTitleClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [docs, setDocs] = useState<DocEntry[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedDocs = await fetchDocs();
      setDocs(fetchedDocs);
    }
    fetchData();
  }, []);
  console.log('docs', docs);
  if (isMobile) {
    return null;
  }

  return (
    <Box
      component="nav"
      sx={{
        width: 250,
        height: '100%',
        bgcolor: 'grey.600',
        position: 'fixed',
        left: 8,
        top: 72,
        overflowY: 'auto',
        py: 2,
        px: 3,
      }}
    >
      <List component="ul" disablePadding>
        {docs.map((doc) => (
          <ListItem key={doc.sys.id} component="li">
            <Button
              onClick={() => onTitleClick(doc.sys.id)}
              sx={{
                textAlign: 'left',
                fontSize: '16px',
                py: 1,
                px: 0,
                minWidth: 0,
                textTransform: 'none',
                justifyContent: 'left',
                color: 'white',
              }}
            >
              {doc.fields.title}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Menu;
