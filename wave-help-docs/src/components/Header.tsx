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
import { DocEntry } from '../models/Doc';

const useStyles = makeStyles({
  waveBites: {
    color: '#3CB371', // Seafoam green
  },
  help: {
    color: '#000', // Black
  },
});

interface HeaderProps {
  onTitleClick: (id: string) => void;
  menuItems: DocEntry[];
}

const Header: React.FC<HeaderProps> = ({ onTitleClick, menuItems }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
              key={item.sys.id}
              onClick={() => {
                onTitleClick(item.sys.id);
                handleClose();
              }}
            >
              {item.fields.title}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
