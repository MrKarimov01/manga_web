import React from "react";
import { Link, NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
  const { key, subMenu = [] } = data[0] || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const isSubMenuOpen = Boolean(anchorEl);

  const toggleMode = () => {
    const newMode = !currentMode;
    localStorage.setItem('mode', newMode ? 'dark' : 'light');
    setMode(newMode);
  };

  const handleMenuItemClick = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`navbar ${currentMode ? 'dark-mode' : ''}`}>
      <nav>
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
        <form className="search">
          <Link to={"/filter"}>filter</Link>
          <input type="text" maxLength={70} placeholder="Manga qidirish..." />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="mode_t">
          <button onClick={toggleMode} style={{ width: 105 }}>
            {currentMode ? (
              <><i className="fa-solid fa-moon"></i> Dark Mode</>
            ) : (
              <><i className="fa-solid fa-sun"></i> Light Mode</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
