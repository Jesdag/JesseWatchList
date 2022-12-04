import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
import GameSearchBar from './GameSearchBar';

const GamePage = () => {
  const [allGames, setAllgames] = useState(null);
  const [newGames, setNewGames] = useState(null);
  const [recentRelease, setRecentRelease] = useState(null);

  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
  };
  useEffect(() => {
    fetchHandler(
      'https://api.rawg.io/api/games?key=97930b3abde2449eb88423f0580c7725&page_size=10',

      setAllgames
    );
    fetchHandler(
      ` https://api.rawg.io/api/games?key=97930b3abde2449eb88423f0580c7725&dates=2022-10-10,2022-12-12&ordering=-added=-released&page_size=10`,
      setNewGames
    );

    fetchHandler(
      ` https://api.rawg.io/api/games?key=97930b3abde2449eb88423f0580c7725&dates=2022-01-01,2022-12-31&ordering=-ratingsize=10`,
      recentRelease
    );
  }, []);
  console.log(newGames);
  return (
    <StyledGamePage>
      {/* <GameSearchBar /> */}
      <StyledFeatured>
        <h2>Random Games</h2>
        {allGames &&
          allGames.results.map((allG) => {
            // console.log(tv);
            return (
              <NavLink to={`/games/${allG.id}`}>
                <div>
                  <h2>{allG.name}</h2>
                  <StyledPoster src={allG.background_image} />
                  <div>{allG.rating} / 5</div>
                </div>
                <FavButton media={allG} />
                <WatchButton media={allG} />
              </NavLink>
            );
          })}
      </StyledFeatured>
      <h2>Curently Trending</h2>
      <StyledFeatured>
        {newGames &&
          newGames.results.map((allG) => {
            // console.log(tv);
            return (
              <NavLink to={`/games/${allG.id}`}>
                <div>
                  <h2>{allG.name}</h2>
                  <StyledPoster src={allG.background_image} />
                </div>
                <FavButton media={allG} />
                <WatchButton media={allG} />
              </NavLink>
            );
          })}
      </StyledFeatured>

      <h2>Coming Soon</h2>
      <StyledFeatured>
        {recentRelease &&
          recentRelease.results.map((allG) => {
            // console.log(tv);
            return (
              <NavLink to={`/games/${allG.id}`}>
                <div>
                  <StyledPoster src={allG.background_image} />
                  <h1>{allG.name}</h1>
                </div>
                <FavButton media={allG} />
                <WatchButton media={allG} />
              </NavLink>
            );
          })}
      </StyledFeatured>
    </StyledGamePage>
  );
};

export default GamePage;
const StyledGamePage = styled.div``;
const StyledPoster = styled.img`
  width: 400px;
  height: 265px;
  gap: 10px;
  border-radius: 5px;
`;
const StyledFeatured = styled.div`
  display: grid;

  /* grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); */
`;
