import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
const Top250Tv = () => {
  const [top250Tv, setTop250Tv] = useState(null);
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
      `https://imdb-api.com/en/API/Top250TVs/k_44cr6yag`,
      setTop250Tv
    );
  }, []);

  return (
    <StyledFeatured>
      {top250Tv &&
        top250Tv.items.map((tv) => {
          // console.log(tv);
          return (
            <NavLink to={`/tv/${tv.id}`}>
              <div>
                <StyledPoster src={tv.image} />
                <div>{tv.fullTitle}</div>
                <div>{tv.imDbRating}</div>
                <FavButton media={tv} />
                <WatchButton media={tv} />
              </div>
            </NavLink>
          );
        })}
    </StyledFeatured>
  );
};

export default Top250Tv;

const StyledFeatured = styled.div``;
const StyledPoster = styled.img`
  width: 225px;
  height: 325px;
  gap: 10px;
  border-radius: 5px;
`;
