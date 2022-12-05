import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
import MovieSwiper from '../swiper/MovieSwiper';
const TvShowPage = () => {
  const [topShows, setTopShows] = useState(null);
  const [cartoons, setCartoons] = useState(null);
  const [emmy, setEmmy] = useState(null);

  // /////////////Most Shows///////////
  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
  };
  useEffect(() => {
    fetchHandler(
      `https://imdb-api.com/en/API/MostPopularTVs/${process.env.REACT_APP_IMDB}`,
      setTopShows
    );
    fetchHandler(
      `https://imdb-api.com/API/AdvancedSearch/${process.env.REACT_APP_IMDB}?title_type=tv_series&genres=animation`,
      setCartoons
    );
    fetchHandler(
      `https://imdb-api.com/API/AdvancedSearch/${process.env.REACT_APP_IMDB}?title_type=tv_series&genres=documentary`,
      setEmmy
    );
    // console.log(cartoons);
  }, []);

  ////////////////////////////////////

  ////////////////////////////////////
  return (
    <Wrapper>
      <h1>Most Popular Shows</h1>
      {topShows && (
        <StyledFeatured>
          {topShows && <MovieSwiper allGames={topShows.items.slice(0, 10)} />}
        </StyledFeatured>
      )}
      <h1>Animation</h1>
      {cartoons && (
        <StyledFeatured>
          {cartoons && <MovieSwiper allGames={cartoons.results.slice(0, 10)} />}
        </StyledFeatured>
      )}
      <h1>Documentary</h1>
      {emmy && (
        <StyledFeatured>
          {emmy && <MovieSwiper allGames={emmy.results.slice(0, 10)} />}
          console.log(emmy)
        </StyledFeatured>
      )}
    </Wrapper>
  );
};

export default TvShowPage;

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  gap: 10px;
  text-align: center;
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
`;
const StyledTvShowPage = styled.div`
  display: flex;
  width: fit-content;
`;
const StyledPoster = styled.img`
  width: 215px;
  height: 325px;
  border-radius: 5px;
`;
const StyledFeatured = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
`;
