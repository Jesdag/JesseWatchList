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
      <StyledMyWatchlist>My WathList</StyledMyWatchlist>

      <StyledHtwo>Completed</StyledHtwo>
      <StyledFeaturedOne>
        {myCompleted &&
          myCompleted.map((done) => {
            console.log(done);
            return (
              <div>
                <NavLink to={`/movies/${done.id}`}>
                  <StyledPosterCompleted src={done.image} />
                </NavLink>
                <StyledText>{done.title}</StyledText>
                <StyledText>{done.rating}</StyledText>
                <FavButton media={done} />
                <WatchButton media={done} />
              </div>
            );
          })}
      </StyledFeaturedOne>

      <StyledKeep>In Progress</StyledKeep>
      <StyledFeatured>
        {myEnt &&
          myEnt.map((done) => {
            console.log(done);
            return (
              <div>
                <NavLink to={`/movies/${done.id}`}>
                  <StyledPosterThree src={done.image} />
                </NavLink>
                <StyledText>{done.title}</StyledText>
                <StyledText>{done.rating}</StyledText>
                <FavButton media={done} />
                <WatchButton media={done} />
              </div>
            );
          })}
      </StyledFeatured>

      <StyledHThree>Keeping an Eye On</StyledHThree>
      <StyledFeatured>
        {myFavs &&
          myFavs.map((done) => {
            console.log(done);
            return (
              <div>
                <NavLink to={`/movies/${done.id}`}>
                  <StyledPoster src={done.image} />
                </NavLink>
                <StyledText>{done.title}</StyledText>
                <StyledText>{done.rating}</StyledText>
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

const StyledText = styled.div`
  font-weight: bolder;
  font-size: 20px;
  color: rgb();

  text-shadow: rgba(3, 2, 1, 0.9) 0px 0px 39px;
`;
const StyledPosterCompleted = styled.img`
  box-shadow: 0px 0px 28px 9px rgba(255, 46, 46, 0.84);
  margin-top: 30px;
  width: 200px;
  height: 300px;
  gap: 10px;
  border-radius: 5px;
`;
const StyledMyWatchlist = styled.h1`
  font-size: 40px;
  color: orange;
  text-shadow: 0 0 7px #00bbff, 0 0 10px #00bbff, 0 0 21px #00bbff,
    0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
  font-family: 'Sacramento', cursive;
  text-align: center;
  animation: blink 4s infinite;
  -webkit-animation: blink 6s infinite;
  text-decoration: underline;
  margin-bottom: 20px;
`;
const StyledHtwo = styled.h1`
  margin-top: 200px;
  font-size: 40px;
  color: #990b0b;
  text-shadow: 0 0 7px #990b0b, 0 0 10px #990b0b, 0 0 21px #990b0b,
    0 0 42px #730000, 0 0 82px #730000, 0 0 92px #730000, 0 0 102px #730000,
    0 0 151px #730000;
  /* font-family: 'Sacramento', sans-serif; */
  /* background-color: #010a01; */
  /* display: flex; */
  /* justify-content: center; */
  align-items: center;
  border: 3px solid #730000;
  width: 400px;
  margin: auto;
  border-radius: 8px;
  padding: 10px;
`;
const Wrapper = styled.div`
  text-align: center;
  /* border: 4px solid blue; */
  /* margin: auto; */
  height: 100%;
  width: 100%;
  font-size: 20px;
`;
const StyledFeatured = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  background-color: 3px solid;
  font-size: 15px;
`;
const StyledPoster = styled.img`
  margin-top: 30px;
  width: 200px;
  height: 300px;
  gap: 10px;
  border-radius: 5px;
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  box-shadow: 0px 0px 32px 2px rgba(255, 166, 0, 0.9); */
  box-shadow: 0px 0px 28px 9px rgba(46, 175, 255, 0.84);
`;

const StyledHThree = styled.h1`
  font-size: 40px;
  color: #00bbff;
  text-shadow: 0 0 7px #00bbff, 0 0 10px #00bbff, 0 0 21px #00bbff,
    0 0 42px #0080ff, 0 0 82px #0080ff, 0 0 92px #0080ff, 0 0 102px #0080ff,
    0 0 151px #0080ff;
  /* font-family: 'Sacramento', sans-serif; */
  /* background-color: #010a01; */
  /* display: flex; */
  /* justify-content: center; */
  align-items: center;
  border: 3px solid #00bbff;
  width: 400px;

  margin: auto;
  border-radius: 8px;
  padding: 10px;
`;
const StyledPosterThree = styled.img`
  margin-top: 30px;
  width: 200px;
  height: 300px;
  gap: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 28px 9px rgba(46, 255, 49, 0.84);
`;
const StyledKeep = styled.h1`
  font-size: 40px;
  color: #00ff22;
  text-shadow: 0 0 7px #00ff44, 0 0 10px #00ff44, 0 0 21px #00ff44,
    0 0 42px #00ff22, 0 0 82px #00ff44, 0 0 92px #00ff22, 0 0 102px #00ff22,
    0 0 151px #0080ff;
  /* font-family: 'Sacramento', sans-serif; */
  /* background-color: #010a01; */
  /* display: flex; */
  /* justify-content: center; */
  align-items: center;
  border: 3px solid #00ff44;
  width: 400px;
  margin: auto;
  border-radius: 8px;
  padding: 10px;
`;

const StyledFeaturedOne = styled.div`
  display: grid;
  text-align: center;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  background-color: 3px solid;
`;
