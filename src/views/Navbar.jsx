import React from "react";
import { Link, NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


import "./../index.scss";

const data = [
  {
    key: "Types",
    subMenu: [
      { key: "manga" },
      { key: "manhwa" },
      { key: "comic" },
    ],
  },
];

const NavBar = ({ mode: currentMode, setMode }) => {
  
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} >
        <button onClick={toggleDrawer(false)}>Close</button>
    </Box>
  );


  const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        // Sahna yuklanganda session storage dan ma'lumotni olish
        const storedTerm = sessionStorage.getItem('searchTerm');
        if (storedTerm) {
            setSearchTerm(storedTerm);
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Har bir o'zgarishda session storage ga saqlash
        sessionStorage.setItem('searchTerm', value);
    };








  
  const { key, subMenu = [] } = data[0] || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const isSubMenuOpen = Boolean(anchorEl);

  const [navactive, setNavactive] = React.useState(false);
  const toggleMode = () => {
    const newMode = !currentMode;
    localStorage.setItem('mode', newMode ? 'dark' : 'light');
    setMode(newMode);
  };

  const handleMenuItemClick = () => {
    setAnchorEl(null);
  };
  

  return (
    <div className={`navbar ${currentMode ? 'dark-mode' : ''}`} style={{position: "relative "}}>
      <nav>
        <Button onClick={toggleDrawer(true)} className="hambergur"><i className="fa-solid fa-bars " style={{ color: "white" }}></i></Button>
        <Drawer open={open} onClose={toggleDrawer(false)} >
          {DrawerList}
        </Drawer>
        <div className="logo">
          <Link to="/">
            <img src="https://mangareader.to/images/logo.png" alt="" height={50} />
          </Link>
        </div>
        <ul className="menu">
          <li>
            <NavLink to={"/saveds"}>Saqlanganlar</NavLink>
          </li>
          <li
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <MenuItem
              onClick={(e) => setAnchorEl(e.currentTarget)}
              aria-haspopup="true"
              aria-expanded={isSubMenuOpen ? 'true' : 'false'}
              style={{
                backgroundColor: hoveredIndex === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
              }}
            >
              {key} {isSubMenuOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </MenuItem>
            {isSubMenuOpen && (
              <Menu
                id="basic-sub-menu"
                anchorEl={anchorEl}
                open={isSubMenuOpen}
                onClose={() => {
                  setAnchorEl(null);
                  setHoveredIndex(null);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {subMenu.map((subMenuItem, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => handleMenuItemClick()}
                    style={{
                      backgroundColor: hoveredIndex === i + 1 ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                    }}
                  >
                    <Link to={subMenuItem.key}>{subMenuItem.key}</Link>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </li>
          <li><NavLink to={"/az-list"}>A-Z List</NavLink></li>
          <li><NavLink to={"/news"}>News</NavLink></li>
        </ul>
      </nav>

      <div className="navbar__menu">
        <div className={navactive ? "wrapper" : "wrapper active_wrapper"}>
        <form className={navactive ? "search nav_active" : "search"} >
          <Link to={"/filter"}>filter</Link>
          <input type="text" maxLength={70} placeholder="Manga qidirish..."  value={searchTerm} onChange={handleChange}/>
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form></div>
        <div className="mode_t">
          <button onClick={toggleMode} style={{ width: 'auto' }}>
            {currentMode ? (
              <><i className="fa-solid fa-moon"></i> Dark Mode</>
            ) : (
              <><i className="fa-solid fa-sun"></i> Light Mode</>
            )}
          </button>
        </div>
        <div className="responsve_nav">
          <button className="mode_btn_res" onClick={() => setNavactive(!navactive)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <div className="mode_t">
            <button onClick={toggleMode} style={{ width: 'auto' }}>
              <i className={currentMode ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NavBar;
