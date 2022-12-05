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
    <Wrapper>
      <StyledHone>Top 250 TV-Shows Of All Time</StyledHone>

      <StyledFeatured>
        {top250Tv &&
          top250Tv.items.map((tv) => {
            // console.log(tv);
            return (
              <NavLink className='nav' to={`/tv/${tv.id}`}>
                <div>
                  <StyledPoster src={tv.image} />
                  <StyledText>{tv.fullTitle}</StyledText>
                  <StyledText>{tv.imDbRating}</StyledText>
                  <FavButton media={tv} />
                  <WatchButton media={tv} />
                </div>
              </NavLink>
            );
          })}
      </StyledFeatured>
    </Wrapper>
  );
};

export default Top250Tv;

const Wrapper = styled.div`
  text-align: center;

  .nav {
    text-decoration: none;

    color: black;
  }
`;
const StyledText = styled.div`
  text-decoration: none;
`;
const StyledHone = styled.h1`
  font-size: 40px;

  text-shadow: 0 0 5px #f562ff, 0 0 15px #f562ff, 0 0 25px #f562ff,
    0 0 20px #f562ff, 0 0 30px #890092, 0 0 80px #890092, 0 0 80px #890092;
  color: #fccaff;
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  font-family: 'Sacramento', cursive;
  text-align: center;
  animation: blink 12s infinite;
  -webkit-animation: blink 12s infinite;
  margin-bottom: 20px;
`;
const StyledFeatured = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  background-color: 3px solid;
  font-size: 19px;
  font-weight: bolder;
  color: grey;
  text-decoration: none;
  text-align: center;
`;
const StyledPoster = styled.img`
  width: 225px;
  height: 325px;
  gap: 10px;
  border-radius: 5px;
  border: 3px solid orange;
  &:hover {
    border: 4px solid #2eff3c;
    box-shadow: 0px 0px 31px 11px rgba(46, 255, 60, 0.56);
  }
`;
