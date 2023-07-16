import React, { useEffect, useState } from 'react';
import { Box, Button, List, ListItem, Typography, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
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
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openRestaurant, setOpenRestaurant] = useState(false);
  const [openEndUser, setOpenEndUser] = useState(false);

  const handleToggle = (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setOpen(open => !open);
  };

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
        <ListItem onClick={handleToggle(setOpenAdmin)}>
          <Typography variant="h6" color="#89CFF0">Admin</Typography>
          {openAdmin ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAdmin} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderDocs(adminDocs)}
          </List>
        </Collapse>

        <ListItem onClick={handleToggle(setOpenRestaurant)}>
          <Typography variant="h6" color="#98FB98">Restaurant</Typography>
          {openRestaurant ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openRestaurant} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderDocs(restaurantDocs)}
          </List>
        </Collapse>

        <ListItem onClick={handleToggle(setOpenEndUser)}>
          <Typography variant="h6" color="#FFA500">End User</Typography>
          {openEndUser ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openEndUser} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {renderDocs(endUserDocs)}
          </List>
        </Collapse>
      </List>
    </Box>
  );
};

export default Menu;