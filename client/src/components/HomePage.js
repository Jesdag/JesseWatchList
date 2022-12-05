// import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
import { UserContext } from './../context/UserContext';
import MovieSwiper from '../swiper/MovieSwiper';
import MediaSwiper from '../swiper/MediaSwiper';

const Homepage = () => {
  const [inTheaters, setInTheaters] = useState(null);
  const [mostPopularTvShows, setMostPopularTvShows] = useState(null);
  const [games, setGames] = useState(null);
  const { userData } = useContext(UserContext);

  //// Fetch To Api For Movies in Theaters
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
    fetchHandler(
      `https://imdb-api.com/en/API/InTheaters/${process.env.REACT_APP_IMDB}?count=10`,
      setInTheaters
    );
    fetchHandler(
      `https://imdb-api.com/en/API/MostPopularTVs/${process.env.REACT_APP_IMDB}`,
      setMostPopularTvShows
    );
    fetchGamesHandler(
      `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWR}&dates=2022-10-10,2022-12-12&ordering=-added=-released&page_size=10`,
      setGames
    );
  }, []);
  console.log(games);
  return (
    <StyledContainer>
      <StyledHOne>In Theaters</StyledHOne>

      <StyledFeatured>
        {inTheaters && <MovieSwiper allGames={inTheaters.items.slice(0, 10)} />}
      </StyledFeatured>

      <StyledHOne>Trending Shows</StyledHOne>
      <StyledFeatured>
        {mostPopularTvShows && (
          <MovieSwiper allGames={mostPopularTvShows.items.slice(0, 10)} />
        )}
      </StyledFeatured>
      <StyledHOne>Games</StyledHOne>
      <StyledFeatured>
        {games && <MediaSwiper allGames={games.slice(0, 10)} />}
      </StyledFeatured>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled.div`
  height: 200vh;

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
const StyledHOne = styled.h1``;

const StyledGamesRow = styled.div``;
const StyledPoster = styled.img`
  width: 200px;
  height: 300px;
  gap: 10px;
  border-radius: 5px;
`;
// const StyledHomePage = styled.div``;

const StyledFeatured = styled.div`
  display: grid;
  width: var(--full-width);
  grid-template-columns: repeat(auto-fill, minmax(15rem, 6fr));
  /* border: 3px solid green; */
`;

const StyledPosterGames = styled.img`
  width: 250px;
  height: 27px;
  gap: 10px;
  border-radius: 8px;
`;
