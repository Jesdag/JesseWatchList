import { NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Profile from './../auth0/Profile';
import LoginButton from './../auth0/LoginButton';
const SideBar = () => {
  return (
    // <StyledSideBar>
    //   <div>
    //     <h2>Watch-List</h2>
    //   </div>
    //   <div>Top 250 Movies</div>
    //   <div>Top 250 Shows</div>
    //   <NavLink to={'/games'}>
    //     <div>Games</div>
    //   </NavLink>
    //   <NavLink to={'/tv'}>
    //     <div>TvShows</div>
    //   </NavLink>
    //   <NavLink to={'/games'}>
    //     <div>Movies</div>
    //   </NavLink>
    //   <NavLink to={'/account'}>
    //     <div>My Account</div>
    //   </NavLink>
    //   <div>Favorites</div>
    //   <div>My Watchlist</div>
    // </StyledSideBar>
    <Wrapper>
      <nav className='menu' tabIndex='0'>
        <header className='avatar'>
          <Profile />
          <StyletBtn>
            <LoginButton />
          </StyletBtn>
        </header>
        <ul>
          <NavLink to={'/account'}>
            <li tabIndex='0'>
              <span>Account</span>
            </li>
          </NavLink>
          <NavLink to={'/'}>
            <li tabIndex='0'>
              <span>Home</span>
            </li>
          </NavLink>

          <NavLink to={'/acount'}>
            <li tabIndex='0'>
              <span>My Watchlist</span>
            </li>
          </NavLink>
          <NavLink to={'/top250Movies'}>
            <li tabIndex='0'>
              <span>Top 250 Movies</span>
            </li>
          </NavLink>
          <NavLink to={'/top250Tv'}>
            <li tabIndex='0'>
              <span>Top 250 TvShows</span>
            </li>
          </NavLink>
          <NavLink to={'/games'}>
            <li tabIndex='0'>
              <span>Games</span>
            </li>
          </NavLink>
          <NavLink to={'/movies'}>
            <li tabIndex='0'>
              <span>Movies</span>
            </li>
          </NavLink>
          <NavLink to={'/tv'}>
            <li tabIndex='0'>
              <span>TvShows</span>
            </li>
          </NavLink>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default SideBar;

const Wrapper = styled.div`
  background: black;
  margin: 0;
  font-family: 'Open Sans', Helvetica Neue, Helvetica, Arial, sans-serif;
  color: #fff;
  height: 100%;
  .menu {
    background: rgb(40, 40, 40);
    height: 100vh;
    width: 175px;
    /* position: fixed; */
    top: 0;
    left: 0;
    /* z-index: 5; */
    outline: none;
  }
  .avatar {
    background: rgba(0, 0, 0, 0.1);
    padding: 2em 0.5em;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* margin: 3px; */
  }
  img {
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid orange;
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
    margin-left: 35px;
  }
  h2 {
    font-weight: normal;
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0.5em 0;
    margin: 0;
    li {
      padding: 0.5em 1em 0.5em 1em;
      font-size: 0.95em;
      font-weight: regular;
      background-repeat: no-repeat;
      background-position: left 15px center;
      background-size: auto 20px;
      transition: all 0.15s linear;
      cursor: pointer;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &:focus {
        outline: none;
      }
    }
  }
`;

const StyletBtn = styled.div``;
// <StyledSideBar>
//   <div>
//     <h2>Watch-List</h2>
//   </div>
//   <div>Top 250 Movies</div>
//   <div>Top 250 Shows</div>
//   <NavLink to={'/games'}>
//     <div>Games</div>
//   </NavLink>
//   <NavLink to={'/tv'}>
//     <div>TvShows</div>
//   </NavLink>
//   <NavLink to={'/games'}>
//     <div>Movies</div>
//   </NavLink>
//   <NavLink to={'/account'}>
//     <div>My Account</div>
//   </NavLink>
//   <div>Favorites</div>
//   <div>My Watchlist</div>
// </StyledSideBar>
