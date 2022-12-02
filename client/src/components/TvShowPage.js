import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
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
      'https://imdb-api.com/en/API/MostPopularTVs/k_44cr6yag',
      setTopShows
    );
    fetchHandler(
      'https://imdb-api.com/API/AdvancedSearch/k_44cr6yag?title_type=tv_series&genres=animation',
      setCartoons
    );
    fetchHandler(
      'https://imdb-api.com/API/AdvancedSearch/k_44cr6yag?title_type=tv_series&genres=documentary&groups=emmy_winners,emmy_nominees',
      setEmmy
    );
    console.log(cartoons);
  }, []);

  ////////////////////////////////////

  ////////////////////////////////////
  return (
    <Wrapper>
      <h2>Most Popular Shows</h2>
      {topShows && (
        <StyledTvShowPage>
          {topShows.items.map((shows) => {
            // console.log(shows);
            return (
              <NavLink to={`/tv/${shows.id}`}>
                <div>
                  <StyledPoster src={shows.image} />
                  <div>{shows.rating}</div>
                  <div>{shows.fullTitle}</div>
                  <div>{shows.imDbRating}</div>
                  <FavButton media={shows} />
                  <WatchButton media={shows} />
                </div>
              </NavLink>
            );
          })}
        </StyledTvShowPage>
      )}
      <h2>Animation</h2>
      <StyledFeatured>
        {cartoons &&
          cartoons.results.map((show) => {
            // console.log(show);
            return (
              <NavLink to={`/tv/${show.id}`}>
                <div>
                  <StyledPoster src={show.image} />
                  <div>{show.rank}</div>
                  <div>{show.title}</div>
                  <div>{show.imDbRating}</div>
                  <FavButton media={show} />
                  <WatchButton media={show} />
                </div>
              </NavLink>
            );
          })}
      </StyledFeatured>
      <h2>Documentary</h2>
      <StyledFeatured>
        {emmy &&
          emmy.results.map((show) => {
            // console.log(show);
            return (
              <NavLink to={`/tv/${show.id}`}>
                <div>
                  <StyledPoster src={show.image} />
                  <div>{show.rank}</div>
                  <div>{show.title}</div>
                  <div>{show.imDbRating}</div>
                  <FavButton media={show} />
                  <WatchButton media={show} />
                </div>
              </NavLink>
            );
          })}
      </StyledFeatured>
    </Wrapper>
  );
};

export default TvShowPage;

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  gap: 10px;
  text-align: center;
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
