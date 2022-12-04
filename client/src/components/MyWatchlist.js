import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import FavButton from './FavButton';
import WatchButton from './WatchButton';
import { UserContext } from './../context/UserContext';
const MyWatchList = () => {
  const [myFavs, setMyFavs] = useState(null);
  const [myEnt, setMyEnt] = useState(null);
  const [myCompleted, setMyCompleted] = useState(null);
  const { favIds, entertainmentIds, completeIds } = useContext(UserContext);
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
  }, [favIds, entertainmentIds, completeIds]);

  return (
    <Wrapper>
      <h1>My WathList</h1>
      <h2>Completed</h2>
      <StyledFeatured>
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
const Wrapper = styled.div`
  text-align: center;
  border: 3px solid blue;
  margin: auto;
`;
const StyledFeatured = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`;
const StyledPoster = styled.img`
  width: 200px;
  height: 300px;
  gap: 10px;
  border-radius: 5px;
`;
