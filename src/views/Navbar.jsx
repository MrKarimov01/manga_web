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

const NavBar = () => {
  const { key, subMenu = [] } = data[0] || {};
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [mode, setMode] = React.useState(() => {
    // localStorage dan rejimni oling
    return localStorage.getItem('mode') === 'dark';
  });

  // Sub-menu ochilganmi yoki yo'qligini bilish uchun state
  const isSubMenuOpen = Boolean(anchorEl);

  // Rejim o'zgarganda localStorage ga yozish
  const toggleMode = () => {
    setMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('mode', newMode ? 'dark' : 'light'); // Yangi rejimni saqlang
      return newMode;
    });
  };

  return (
    <div className="navbar">
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="https://mangareader.to/images/logo.png" alt="" height={50}/>
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
              style={{
                backgroundColor: hoveredIndex === 0 ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
              }}
            >
              {key} {isSubMenuOpen ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </MenuItem>
            <div className={`submenu ${isSubMenuOpen ? 'open' : ''}`}>
              {isSubMenuOpen && (
                <Menu
                  id="basic-sub-menu"
                  anchorEl={anchorEl}
                  open={!!anchorEl}
                  onClose={() => {
                    setAnchorEl(null);
                    setHoveredIndex(null);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {subMenu.map((subMenuItem, i) => (
                    <MenuItem
                      key={i}
                      onClick={() => setAnchorEl(null)}
                      style={{
                        backgroundColor: hoveredIndex === i + 1 ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                      }}
                    >
                      <Link to={subMenuItem.key}>{subMenuItem.key}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </div>
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
          <button onClick={toggleMode}>
            {mode ? (
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
