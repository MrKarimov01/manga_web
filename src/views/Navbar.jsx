import React from "react";
import { Link, NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';



import "./../index.scss";

const data = [
  {
    key: "Types",
    subMenu: [
      { key: "manga" },
      { key: "manhwa" },
      { key: "comic" },
      { key: "doujinshi" },
      { key: "manhua" },
    ],
  },
];



const NavBar = ({ mode: currentMode, setMode }) => {

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Thriller',
    'Slice of Life',
    'Supernatural',
    'Historical',
    'Martial Arts',
    'Mecha',
    'Psychological',
    'Sports',
    'Shounen',
    'Shoujo',
    'Seinen',
    'Josei',
    'Isekai',
    'School Life',
    'Tragedy',
    'Ecchi',
    'Harem',
    'Music',
    'Parody',
    'Military',
    'Post-Apocalyptic',
    'Vampire',
    'Cyberpunk',
    'Space',
    'Steampunk'
  ];
  
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleMode = () => {
    const newMode = !currentMode;
    localStorage.setItem('mode', newMode ? 'dark' : 'light');
    setMode(newMode);
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="side_bar_in">
      <div className="top_menu">
      <button onClick={toggleDrawer(false)} className="close_side_btn"><i class="fa-solid fa-chevron-left"></i></button>

      <button onClick={toggleMode} className="mode_btn_side">
                <i className={currentMode ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
      </button>


      </div>
  
      <Link to={"/"} onClick={toggleDrawer(false)} className="link_btn">Home</Link>
      <div className="inner_nav">
        
        <div className="types">
          <h3>Types</h3>
          <ul>
            {data.map((item) => (
              
                item.subMenu.map((subItem) => (
                  <li key={item.key}> <Link
                    to={`content/types/${subItem.key}`}
                    key={subItem.key}
                  >
                    {subItem.key}
                  </Link></li>
                ))
              
            ))}
          </ul>
        </div>
        
        <div className="side_menu_links">
          <Link to={"content/az-list"} className="link_btn">A-Z List</Link>
          
          <Link to={"/?random=1"} className="link_btn">Random</Link>
          
          <Link to={'content/news'} className="link_btn">News</Link>
          
        </div>
        <div className="genres_side_nav">
          <h3>Genres</h3>
          <ul>
            {genres.slice(0, 10).map((genre, index) => (
              <li key={index}>
                <Link to={`content/${genre.toLowerCase()}`}>{genre}</Link>
              </li>
            ))}
            {isOpen && genres.slice(1).map((genre, index) => (
              <li key={index + 1}>
                <Link to={`content/${genre.toLowerCase()}`}>{genre}</Link>
              </li>
            ))}
            <li onClick={toggleMenu} style={{ cursor: 'pointer' }}>
              <span>{isOpen ? 'Less-' : '+ More'}</span>
            </li>
          </ul>
        </div>
      </div>
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
  

  const handleMenuItemClick = () => {
    setAnchorEl(null);
  };


  return (
    <React.Fragment>
      <div className={`navbar `} style={{ position: "relative " }}>
        <nav>
          <Button onClick={toggleDrawer(true)} className="hambergur"><i className="fa-solid fa-bars " style={{ color: "white" }}></i></Button>
            <Drawer
              open={open}
              onClose={toggleDrawer(false)}
              className={currentMode ? "side_nav side_nav_light" : "side_nav "}
            >
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
                      <Link to={"/content/" + subMenuItem.key}>{subMenuItem.key}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </li>
            <li><NavLink to={"content/az-list"}>A-Z List</NavLink></li>
            <li><NavLink to={"content/news"}>News</NavLink></li>
          </ul>
        </nav>

        <div className="navbar__menu">
          <div className={navactive ? "wrapper" : "wrapper active_wrapper"}>
            <form className={navactive ? "search nav_active" : "search"} >
              <Link to={"/filter"}>filter</Link>
              <input type="text" maxLength={70} placeholder="Manga qidirish..." value={searchTerm} onChange={handleChange} />
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

      <div className={currentMode ? "bootom_nav" : "bootom_nav active_bootom_nav"}>
        <ul>
          <li className="list">
            <NavLink to={"/"}>
              <span className="icon"><i class="fa-solid fa-house"></i></span>
              <span className="text">Home</span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to={"/saveds"}>
              <span className="icon"><i class="fa-regular fa-bookmark"></i></span>
              <span className="text">Saved</span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to={"/content"}>
              <span className="icon"><i class="fa-solid fa-book"></i></span>
              <span className="text">Topic</span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to={"/search"}>
              <span className="icon"><i class="fa-solid fa-magnifying-glass"></i></span>
              <span className="text">Search</span>
            </NavLink>
          </li>
          <div className="indicator"></div>
        </ul>

      </div>
      <div className={currentMode ? "dark_mode open_dark" : "dark_mode"}>

      </div>


    </React.Fragment>

  );
};

export default NavBar;
