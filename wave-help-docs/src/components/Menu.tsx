// Menu.tsx

import React from 'react';
import { Box, Button, List, ListItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/system';

interface MenuProps {
  onTitleClick: (id: string) => void;
}

// Fake data with Lorem Ipsum titles
const fakeData = [
  { id: '1', title: 'Lorem ipsum dolor sit amet' },
  { id: '2', title: 'Consectetur adipiscing elit' },
  { id: '3', title: 'Integer nec odio' },
  { id: '4', title: 'Praesent libero' },
  { id: '5', title: 'Sed cursus ante dapibus diam' },
];

const Menu: React.FC<MenuProps> = ({ onTitleClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        top: 72, // Change the value to the height of your header
        overflowY: 'auto',
        py: 2,
        px: 3,
      }}
    >
      <List component="ul" disablePadding>
        {fakeData.map((item) => (
          <ListItem key={item.id} component="li">
            <Button
              onClick={() => onTitleClick(item.id)}
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
              {item.title}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Menu;
