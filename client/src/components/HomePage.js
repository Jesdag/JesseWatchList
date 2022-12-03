// import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
import { UserContext } from './../context/UserContext';

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
  useEffect(() => {
    fetchHandler(
      'https://imdb-api.com/en/API/InTheaters/k_44cr6yag',
      setInTheaters
    );
    fetchHandler(
      'https://imdb-api.com/en/API/MostPopularTVs/k_44cr6yag',
      setMostPopularTvShows
    );
    fetchHandler(
      'https://api.rawg.io/api/games?key=97930b3abde2449eb88423f0580c7725',
      setGames
    );
  }, []);
  return (
    <StyledContainer>
      <h2>In Theaters</h2>
      <StyledFeatured>
        {inTheaters &&
          inTheaters.items.map((movie) => {
            // console.log(movie);
            return (
              <div>
                <NavLink to={`/movies/${movie.id}`}>
                  <StyledPoster src={movie.image} />
                </NavLink>
                <div>{movie.fullTitle}</div>
                <div>{movie.imDbRating}</div>
                {userData && (
                  <>
                    <FavButton media={movie} />
                    <WatchButton media={movie} />
                  </>
                )}
              </div>
            );
          })}
      </StyledFeatured>
      <h2>Trending Shows</h2>
      <StyledFeatured>
        {mostPopularTvShows &&
          mostPopularTvShows.items.map((show) => {
            // console.log(show);
            return (
              <div>
                <NavLink to={`/tv/${show.id}`}>
                  <StyledPoster src={show.image} />
                </NavLink>
                {/* <div>{show.rank}</div> */}
                <div>{show.fullTitle}</div>
                <div>{show.imDbRating}</div>
                <FavButton media={show} />
                <WatchButton media={show} />
              </div>
            );
          })}
      </StyledFeatured>
      <h2>Games</h2>
      <StyledFeatured>
        {games &&
          games.results.map((gm) => {
            const { id, name, rating } = gm;
            // console.log(typeof id);
            const mediaObj = {
              id: id,
              title: name,
              rating,
              image: gm.background_image,
            };
            return (
              <div>
                <NavLink to={`/games/${gm.id}`}>
                  <StyledPosterGames src={gm.background_image} />
                </NavLink>
                {/* <div> */}
                <div>{gm.name}</div>
                <div>{gm.rating}</div>

                <FavButton media={mediaObj} />
                <WatchButton media={mediaObj} />

                {/* </div> */}
              </div>
            );
          })}
      </StyledFeatured>
    </StyledContainer>
  );
};

export default Homepage;

const StyledContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  text-align: center;
`;
const StyledPoster = styled.img`
  width: 225px;
  height: 300px;
  gap: 10px;
  border-radius: 5px;
`;
// const StyledHomePage = styled.div``;

const StyledFeatured = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
`;

const StyledPosterGames = styled.img`
  width: 350px;
  height: 250px;
  gap: 10px;
  border-radius: 8px;
`;
