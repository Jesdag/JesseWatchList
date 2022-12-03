import { NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import LoginButton from './../auth0/LoginButton';
import { CgScreen } from 'react-icons/cg';
import { FaGamepad } from 'react-icons/fa';
import { SiAngellist } from 'react-icons/si';
import { BiListUl, BiPowerOff } from 'react-icons/bi';
import { AiOutlineHome } from 'react-icons/ai';
import { CiBeerMugFull } from 'react-icons/ci';

const SideBar = () => {
  return (
    <SideBarFix>
      <div class='area'></div>
      <nav class='main-menu'>
        <ul>
          <li>
            <NavLink to={'/'}>
              <AiOutlineHome className='fa fa-laptop fa-2x' />
              <span class='nav-text'>Home</span>
            </NavLink>
          </li>
          <li class='has-subnav'>
            <NavLink to={'/myWatchList'}>
              <CiBeerMugFull className='fa fa-laptop fa-2x' />
              <span class='nav-text'>Watch List</span>
            </NavLink>
          </li>
          <li class='has-subnav'>
            <NavLink to={'/top250Movies'}>
              <BiListUl className='fa fa-laptop fa-2x' />
              <span class='nav-text'> Top 250 Movies</span>
            </NavLink>
          </li>
          <li class='has-subnav'>
            <NavLink to={'/movies'}>
              <CgScreen className='fa fa-folder-open fa-2x' />
              <span class='nav-text'>Movies</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/top250Tv'}>
              <BiListUl className='fa fa-laptop fa-2x' />
              <span class='nav-text'>Top 250 TvShows</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/tv'}>
              <CgScreen className='fa fa-folder-open fa-2x' />
              <span class='nav-text'>Tv Shows</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/games'}>
              <FaGamepad className='fa fa-table fa-2x' />
              <span class='nav-text'>Games</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/dev'}>
              <SiAngellist className='fa fa-power-off fa-2x' />
              <span class='nav-text'>Jesse's Top Pick</span>
            </NavLink>
          </li>
        </ul>

        <ul class='logout'>
          <li>
            <BiPowerOff className='fa fa-power-off fa-2x' />
            <span class='nav-text'>
              <LoginButton />
            </span>
          </li>
        </ul>
      </nav>
    </SideBarFix>
  );
};

export default SideBar;
const SideBarFix = styled.div`
  .fa-2x {
    font-size: 2em;
  }
  .fa {
    position: relative;
    display: table-cell;
    width: 60px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size: 20px;
  }

  .main-menu:hover,
  nav.main-menu.expanded {
    width: 250px;
    overflow: visible;
  }

  .main-menu {
    background: #212121;
    border-right: 1px solid #e5e5e5;
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    left: 0;
    width: 60px;
    overflow: hidden;
    -webkit-transition: width 0.05s linear;
    transition: width 0.05s linear;
    -webkit-transform: translateZ(0) scale(1, 1);
    z-index: 1000;
  }

  .main-menu > ul {
    margin: 7px 0;
  }

  .main-menu li {
    position: relative;
    display: block;
    width: 250px;
  }

  .main-menu li > a {
    position: relative;
    display: table;
    border-collapse: collapse;
    border-spacing: 0;

    text-shadow: 0 0 5px #f562ff, 0 0 15px #f562ff, 0 0 25px #f562ff,
      0 0 20px #f562ff, 0 0 30px #890092, 0 0 80px #890092, 0 0 80px #890092;
    color: #fccaff;
    text-shadow: 0 0 5px, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500,
      0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
    color: #fff6a9;
    font-family: 'Sacramento', cursive;
    text-align: center;
    animation: blink 12s infinite;
    -webkit-animation: blink 12s infinite;
    font-family: arial;
    font-size: 14px;
    text-decoration: none;
    -webkit-transform: translateZ(0) scale(1, 1);
    -webkit-transition: all 0.1s linear;
    transition: all 0.1s linear;
  }

  .main-menu .nav-icon {
    position: relative;
    display: table-cell;
    width: 60px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size: 18px;
  }

  .main-menu .nav-text {
    position: relative;
    display: table-cell;
    vertical-align: middle;
    width: 190px;
    font-family: 'Titillium Web', sans-serif;
  }

  .main-menu > ul.logout {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .no-touch .scrollable.hover {
    overflow-y: hidden;
  }

  .no-touch .scrollable.hover:hover {
    overflow-y: auto;
    overflow: visible;
  }

  a:hover,
  a:focus {
    text-decoration: none;
  }

  nav {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  nav ul,
  nav li {
    outline: 0;
    margin: 0;
    padding: 0;
  }
  .main-menu li:hover > a,
  nav.main-menu li.active > a,
  .dropdown-menu > li > a:hover,
  .dropdown-menu > li > a:focus,
  .dropdown-menu > .active > a,
  .dropdown-menu > .active > a:hover,
  .dropdown-menu > .active > a:focus,
  .no-touch .dashboard-page nav.dashboard-menu ul li:hover a,
  .dashboard-page nav.dashboard-menu ul li.active a {
    color: #fff;
    background-color: #5fa2db;
  }
  .area {
    float: left;
    background: #e2e2e2;
    width: 100%;
    height: 100%;
  }
`;
