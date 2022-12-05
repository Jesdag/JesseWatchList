import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
import MovieSwiper from '../swiper/MovieSwiper';
const MoviePage = () => {
  const [mComingSoon, setMComingSoon] = useState(null);
  const [topBoxOffice, setBoxOffice] = useState(null);
  const [mostPopMovies, setMostPopMovies] = useState(null);

  ///////Fetch to Api for

  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
  };
  useEffect(() => {
    fetchHandler(
      `https://imdb-api.com/en/API/ComingSoon/${process.env.REACT_APP_IMDB}`,
      setMComingSoon
    );
    fetchHandler(
      `https://imdb-api.com/en/API/MostPopularMovies/${process.env.REACT_APP_IMDB}`,
      setMostPopMovies
    );
    fetchHandler(
      `https://imdb-api.com/en/API/BoxOffice/${process.env.REACT_APP_IMDB}`,
      setBoxOffice
    );
  }, []);

  return (
    <WrapperMoviePage>
      <h1>Most Popular Movies</h1>
      <StyledFeatured>
        {mostPopMovies && (
          <MovieSwiper allGames={mostPopMovies.items.slice(0, 20)} />
        )}
      </StyledFeatured>

      <h1>Top BoxOffice</h1>
      <StyledFeatured>
        {topBoxOffice && (
          <MovieSwiper allGames={topBoxOffice.items.slice(0, 10)} />
        )}
      </StyledFeatured>

      <h1>Coming Soon</h1>
      <StyledFeatured>
        {mComingSoon && (
          <MovieSwiper allGames={mComingSoon.items.slice(0, 10)} />
        )}
      </StyledFeatured>
    </WrapperMoviePage>
  );
};
export default MoviePage;
const WrapperMoviePage = styled.div`
  min-height: 100vh;
  min-width: var(--full-width);
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
  /* text-decoration: underline; */

  min-width: 100vw;
`;

const StyledFeatured = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
`;
