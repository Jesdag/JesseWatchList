import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
import GameSearchBar from './GameSearchBar';
import MediaSwiper from '../swiper/MediaSwiper';

const GamePage = () => {
  const [allGames, setAllgames] = useState(null);
  const [newGames, setNewGames] = useState(null);
  const [recentRelease, setRecentRelease] = useState(null);

  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
  };

  const fetchGamesHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    const mapData = json.results.map((gm) => {
      const { id, name, rating } = gm;
      // console.log(typeof id);
      const mediaObj = {
        id: id,
        title: name,
        rating,
        image: gm.background_image,
      };
      return mediaObj;
    });
    callback(mapData);
  };

  useEffect(() => {
    fetchGamesHandler(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWR}&page_size=10`,

      setAllgames
    );
    fetchGamesHandler(
      ` https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWR}&dates=2022-10-10,2022-12-12&ordering=-added=-released&page_size=10`,
      setNewGames
    );

    fetchGamesHandler(
      ` https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWR}&dates=2022-01-01,2022-12-31&ordering=-ratingsize=10`,
      setRecentRelease
    );
  }, []);
  console.log(newGames);
  return (
    <StyledGamePage>
      {/* <GameSearchBar /> */}

      <h1>Curently Trending</h1>
      <StyledFeatured>
        {newGames && <MediaSwiper allGames={newGames.slice(0, 10)} />}
      </StyledFeatured>
      <h1>Recently Added</h1>
      <StyledFeatured>
        {recentRelease && <MediaSwiper allGames={recentRelease.slice(0, 10)} />}
      </StyledFeatured>
      <h1>Random Games</h1>
      <StyledFeatured>
        {allGames && <MediaSwiper allGames={allGames.slice(0, 400)} />}
      </StyledFeatured>
    </StyledGamePage>
  );
};

export default GamePage;
const StyledGamePage = styled.div`
  /* padding-top: 10px; */
  text-align: center;
  font-size: large;
  text-align: center;
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  /* font-family: 'Sacramento', cursive; */
  text-align: center;
  animation: blink 12s infinite;
  -webkit-animation: blink 6s infinite;
  text-decoration: underline;
`;

const StyledFeatured = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`;
