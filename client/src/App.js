import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import React from 'react';
import SideBar from './components/SideBar';
import MoviePage from './components/MoviePage';
import HomePage from './components/HomePage';
import TvShowPage from './components/TvShowPage';
import Favorites from './components/Favorites';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useContext } from 'react';
import { UserContext } from './context/UserContext';
import GameDetails from './singlepagesById/GameDetails';
import MovieDetails from './singlepagesById/MovieDetails';
import TvDetails from './singlepagesById/TvDetails';
import Top250Moives from './components/Top250Movies';
import Top250Tv from './components/Top250Tv';
import GamePage from './components/GamePage';
import SearchBar from './components/SearchBar';
import MyWatchList from './components/MyWatchlist';
// import 'swiper/css/bundle';

// import NewSearchBar from './components/NewSearchBar';

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {
    setUserData,
    userData,
    setFavIds,
    setEntertainmentIds,
    setCompleteIds,
  } = useContext(UserContext);

  useEffect(() => {
    const userInfo = async () => {
      console.log(user);
      try {
        const result = await fetch('/api/checkUser', {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-type': 'application/json',
          },
        });
        console.log(result);
        const response = await result.json();
        console.log(response);
        setFavIds(response.favsArray);
        setUserData(response.data);
        setEntertainmentIds(response.entertainmentArray);
        setCompleteIds(response.completeArray);
      } catch (err) {
        console.log(err);
      }
    };
    isAuthenticated && userInfo();
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Wapper>
        <StyledColor>
          <SideBar />
          <StyledDiv>
            <SearchBar />

            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/movies' element={<MoviePage />} />
              <Route path='/games' element={<GamePage />} />
              <Route path='/tv' element={<TvShowPage />} />
              <Route path='/games/:id' element={<GameDetails />} />
              <Route path='/movies/:id' element={<MovieDetails />} />
              <Route path='/tv/:id' element={<TvDetails />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/top250Movies' element={<Top250Moives />} />
              <Route path='/top250Tv' element={<Top250Tv />} />
              <Route path='/myWatchList' element={<MyWatchList />} />
            </Routes>
          </StyledDiv>
        </StyledColor>
      </Wapper>
    </BrowserRouter>
  );
};

const Wapper = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  /* flex-wrap: wrap; */
`;
const StyledDiv = styled.div`
  position: relative;
  margin-left: var(--sidebar-width);
  display: block;
  min-height: 100vh;
  min-width: var(--full-width);
  /* border: 3px solid yellow; */
`;
const StyledColor = styled.div`
  background-color: rgb(64, 64, 64);
  width: 100vw;
`;
export default App;
