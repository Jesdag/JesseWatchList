import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
const MyWatchList = () => {
  const [myFavs, setMyFavs] = useState(null);
  const [myEnt, setMyEnt] = useState(null);
  const [myCompleted, setMyCompleted] = useState(null);

  useEffect(() => {
    fetch('/api/UsersList')
      .then((res) => res.json())
      .then((data) => {
        const { favArray, entArray, compArray } = data.data;
        console.log(favArray);
        console.log(entArray);
        console.log(compArray);
        setMyFavs(favArray);
        setMyEnt(entArray);
        setMyCompleted(compArray);
        // console.log(data.items);
      })
      .catch((error) => {
        console.log('error');
      });
  }, []);

  return (
    <Wrapper>
      <h1>My WathList</h1>

      <StyledFeatured>
        <h2>Completed</h2>
        {myCompleted &&
          myCompleted.map((done) => {
            console.log(done);
            return (
              <div>
                <NavLink to={`/movies/${done.id}`}>
                  <StyledPoster src={done.image} />
                </NavLink>
                <div>{done.title}</div>
                <div>{done.rating}</div>
                <FavButton media={done} />
                <WatchButton media={done} />
              </div>
            );
          })}
      </StyledFeatured>

      <StyledFeatured>
        <h2>Currently Consuming</h2>
        {myFavs &&
          myFavs.map((done) => {
            console.log(done);
            return (
              <div>
                <NavLink to={`/movies/${done.id}`}>
                  <StyledPoster src={done.image} />
                </NavLink>
                <div>{done.title}</div>
                <div>{done.rating}</div>
                <FavButton media={done} />
                <WatchButton media={done} />
              </div>
            );
          })}
      </StyledFeatured>
      <StyledFeatured>
        <h2>Keeping a Eye On</h2>
        {myEnt &&
          myEnt.map((done) => {
            console.log(done);
            return (
              <div>
                <NavLink to={`/movies/${done.id}`}>
                  <StyledPoster src={done.image} />
                </NavLink>
                <div>{done.title}</div>
                <div>{done.rating}</div>
                <FavButton media={done} />
                <WatchButton media={done} />
              </div>
            );
          })}
      </StyledFeatured>
    </Wrapper>
  );
};
export default MyWatchList;
const Wrapper = styled.div``;
const StyledFeatured = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
`;
const StyledPoster = styled.img`
  width: 225px;
  height: 300px;
  gap: 10px;
  border-radius: 5px;
`;
