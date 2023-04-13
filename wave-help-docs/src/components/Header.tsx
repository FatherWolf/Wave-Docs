import React from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  waveBites: {
    color: '#3CB371', // Seafoam green
  },
  help: {
    color: '#000', // Black
  },
});

// New fake data
const newFakeData = [
  { id: '6', title: 'New Lorem ipsum dolor sit amet' },
  { id: '7', title: 'New Consectetur adipiscing elit' },
  { id: '8', title: 'New Integer nec odio' },
  { id: '9', title: 'New Praesent libero' },
  { id: '10', title: 'New Sed cursus ante dapibus diam' },
];

interface HeaderProps {
  onTitleClick: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onTitleClick }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuItems, setMenuItems] = React.useState(newFakeData);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.waveBites}>
          WaveBites
        </Typography>
        <Typography variant="h6" className={classes.help}>
          Help
        </Typography>
        <Box flexGrow={1} />
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              onClick={() => {
                onTitleClick(item.id);
                handleClose();
              }}
            >
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
