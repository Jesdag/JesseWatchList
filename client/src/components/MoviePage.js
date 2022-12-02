import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
const MoviePage = () => {
  const [mComingSoon, setMComingSoon] = useState(null);
  const [topBoxOffice, setBoxOffice] = useState(null);
  const [mostPopMovies, setMostPopMovies] = useState(null);

  ///////Fetch to Api for Movies Coming Soon
  // useEffect(() => {
  //   fetch('/api/comingSoon')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMComingSoon(data);
  //       console.log(data);
  //     });
  // }, []);

  ///////Fetch to Api for Most Pop Movies

  useEffect(() => {
    fetch('/api/MostPopularMovie')
      .then((res) => res.json())
      .then((data) => {
        setMostPopMovies(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch('/api/topBoxOfficeAllTime')
      .then((res) => res.json())
      .then((data) => {
        setBoxOffice(data);
        console.log(data);
      });
  }, []);

  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
  };
  useEffect(() => {
    fetchHandler(
      'https://imdb-api.com/en/API/ComingSoon/k_44cr6yag',
      setMComingSoon
    );
    fetchHandler(
      'https://imdb-api.com/en/API/MostPopularMovies/k_44cr6yag',
      setMostPopMovies
    );
    fetchHandler(
      'https://imdb-api.com/en/API/BoxOffice/k_44cr6yag',
      setBoxOffice
    );
  }, []);

  return (
    <WrapperMoviePage>
      <h2>Most Popular Movies</h2>
      <StyledFeatured>
        {mostPopMovies &&
          mostPopMovies.items.map((movieMostPop) => {
            return (
              <NavLink to={`/movies/${movieMostPop.id}`}>
                <div>
                  <StyledPoster src={movieMostPop.image} />
                  <div>{movieMostPop.fullTitle}</div>
                  <div>{movieMostPop.imDbRating}</div>
                  <FavButton media={movieMostPop} />
                  <WatchButton media={movieMostPop} />
                </div>
              </NavLink>
            );
          })}
      </StyledFeatured>

      <h2>Top BoxOffice</h2>
      <StyledFeatured>
        {topBoxOffice &&
          topBoxOffice.items.map((topBox) => {
            return (
              <NavLink to={`/movies/${topBox.id}`}>
                <div>
                  <StyledPoster src={topBox.image} />
                  <div>{topBox.fullTitle}</div>
                  <div>{topBox.imDbRating}</div>
                  <FavButton media={topBox} />
                  <WatchButton media={topBox} />
                </div>
              </NavLink>
            );
          })}
      </StyledFeatured>
      <h2>Coming Soon</h2>
      <StyledFeatured>
        {mComingSoon &&
          mComingSoon.items.map((movie) => {
            return (
              <>
                <div>
                  <StyledPoster src={movie.image} />
                  <div>{movie.fullTitle}</div>
                  {/* <div>{movie.imDbRating}</div> */}
                  <FavButton media={movie} />
                  <WatchButton media={movie} />
                </div>
              </>
            );
          })}
      </StyledFeatured>
    </WrapperMoviePage>
  );
};
export default MoviePage;
const WrapperMoviePage = styled.div`
  min-height: 100vh;
  min-width: 100vw;
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
