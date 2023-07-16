import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';
import { DocEntry } from '../models/Doc';
import { fetchDocs } from '../utils/fetchDocs';

interface MenuProps {
  onTitleClick: (id: string) => void;
  adminDocs: DocEntry[];
  restaurantDocs: DocEntry[];
  endUserDocs: DocEntry[];
}

const Menu: React.FC<MenuProps> = ({ onTitleClick, adminDocs, restaurantDocs, endUserDocs }) => {
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

  const renderDocs = (docs: DocEntry[]) => (
    docs.map((doc) => (
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
    ))
  );

  return (
    <Box
      component="nav"
      sx={{
        width: 'min-content',
        minWidth: 250,
        paddingRight: '1rem',
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
        <Typography variant="h6" color="white">Admin</Typography>
        {renderDocs(adminDocs)}

        <Typography variant="h6" color="white">Restaurant</Typography>
        {renderDocs(restaurantDocs)}

        <Typography variant="h6" color="white">End User</Typography>
        {renderDocs(endUserDocs)}
      </List>
    </Box>
  );
};

export default Menu;