import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
const GamePage = () => {
  const [allGames, setAllgames] = useState(null);
  const [genres, setGenres] = useState(null);

  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
  };
  useEffect(() => {
    fetchHandler(
      'https://api.rawg.io/api/games?key=97930b3abde2449eb88423f0580c7725',

      setAllgames
    );
  }, []);

  return (
    <StyledGamePage>
      <StyledFeatured>
        {allGames &&
          allGames.results.map((allG) => {
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
