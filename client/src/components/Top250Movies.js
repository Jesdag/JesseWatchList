import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';

const Top250Moives = () => {
  const [top250Movies, setTop250Movies] = useState(null);
  const { id } = useParams();

  ////////////Top 250 APi Fetch
  const fetchHandler = async (string, callback) => {
    // const { id } = useParams();

    const res = await fetch(string);
    const json = await res.json();
    callback(json);
  };
  useEffect(() => {
    fetchHandler(
      `https://imdb-api.com/en/API/Top250Movies/k_44cr6yag`,
      setTop250Movies
    );
  }, []);

  return (
    <StyledFeatured>
      {top250Movies &&
        top250Movies.items.map((movie) => {
          // console.log(movie);
          return (
            <NavLink to={`/movies/${movie.id}`}>
              <div>
                <StyledPoster src={movie.image} />
                <div>{movie.fullTitle}</div>
                <div>{movie.imDbRating}</div>
                <FavButton media={movie} />
                <WatchButton media={movie} />
              </div>
            </NavLink>
          );
        })}
    </StyledFeatured>
  );
};

export default Top250Moives;

const StyledFeatured = styled.div``;
const StyledPoster = styled.img`
  width: 225px;
  height: 325px;
  gap: 10px;
  border-radius: 5px;
`;
