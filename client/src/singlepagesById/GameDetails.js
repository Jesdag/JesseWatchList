import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FavButton from './../components/FavButton';
import WatchButton from './../components/WatchButton';
import GameSearchBar from './../components/GameSearchBar';
import styled from 'styled-components';
const GameDetails = () => {
  const [games, setGames] = useState(null);
  const [gameTrailers, setGameTrailers] = useState(null);
  const [mediaObj, setMediaObj] = useState(null);

  const { id } = useParams();
  console.log(id);
  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
    const { id, name, rating } = json;
    // console.log(typeof id);
    const obj = {
      id: id,
      title: name,
      rating,
      image: json.background_image,
    };
    setMediaObj(obj);
  };
  useEffect(() => {
    fetchHandler(
      `https://api.rawg.io/api/games/${id}?key=97930b3abde2449eb88423f0580c7725`,
      setGames
    );
  }, [id]);
  console.log(games);
  return (
    <>
      {/* <GameSearchBar /> */}
      {!games && !mediaObj ? (
        <div>
          <img
            src={
              'https://media.tenor.com/TlyRveJkgo4AAAAj/cloud-cloud-strife.gif'
            }
          />
        </div>
      ) : (
        <StyledMegaContainer>
          <StyledGameTitle>
            <h1>{games.name}</h1>
          </StyledGameTitle>
          <div>
            <StyledStarter>
              <StyledGamePoster src={games.background_image} />
              <div>
                <StyledStores>
                  <StyledRating>
                    <span>Score:</span> {games.metacritic}
                  </StyledRating>
                  Where to Purchase:
                  {games.stores.map((store) => {
                    return (
                      <div>
                        {store.store.name}
                        <StyledSpan>
                          <div>{store.store.domain}</div>
                        </StyledSpan>
                      </div>
                    );
                  })}
                </StyledStores>
              </div>
            </StyledStarter>
          </div>
          '
          {games.developers[1] && (
            <StyledDevs>
              <h2>{games.developers[1].name}</h2>
            </StyledDevs>
          )}
          <StyledBtn>
            <FavButton media={mediaObj} />
            <WatchButton media={mediaObj} />
          </StyledBtn>
          <div>
            <StyledDescription>{games.description_raw}</StyledDescription>
          </div>{' '}
          <StylePlatforms>
            {games.platforms.map((plat) => {
              return (
                <div>
                  Platform: <StyledSpan>{plat.platform.name}</StyledSpan>
                </div>
              );
            })}
          </StylePlatforms>
        </StyledMegaContainer>
      )}
    </>
  );
};
export default GameDetails;

const StyledMegaContainer = styled.div`
  /* border: 3px solid red; */
  /* display: flex; */
  /* flex-direction: column; */
  background-color: rgb(40, 40, 40);
  height: 100%;
  margin-left: 12%;
  margin-right: 12%;
  border-radius: 8px;
  margin-top: 20px;
  color: grey;
`;
const StyledDevs = styled.div`
  font-size: 25px;
  text-align: center;
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  font-family: 'Sacramento', cursive;
  text-align: center;
  animation: blink 4s infinite;
  -webkit-animation: blink 6s infinite;
`;
const StyledRating = styled.div`
  text-align: center;
  font-size: 40px;
  color: #fff;

  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  font-family: 'Sacramento', cursive;
  text-align: center;
  animation: blink 4s infinite;
  -webkit-animation: blink 6s infinite;
`;

const StyledSpan = styled.span`
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  text-align: center;
  animation: blink 4s infinite;
  -webkit-animation: blink 6s infinite;
  margin: 10px;
`;
const StyledStarter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  align-content: center;
`;

const StyledStores = styled.div`
  /* border: 3px solid blue; */
  height: 100%;
  font-size: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  justify-content: space-evenly;
`;
const StyledGameTitle = styled.div`
  padding-top: 10px;
  /* border: 2px solid yellow; */
  text-align: center;
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  /* font-family: 'Sacramento', cursive; */
  text-align: center;
  animation: blink 12s infinite;
  -webkit-animation: blink 6s infinite;
  text-decoration: underline;
`;
const StyledGamePoster = styled.img`
  width: 1260px;
  /* height: 800px; */
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  box-shadow: 0px 0px 32px 2px rgba(255, 166, 0, 0.9);
  margin-bottom: 15px;
  border-radius: 5px;
  /* border: 3px solid orange; */
`;
const StyledBtn = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StylePlatforms = styled.div`
  display: flex;
  justify-content: center;
  /* border: 3px solid green; */
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 20px;
`;
const StyledDescription = styled.div`
  text-align: center;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  /* border: 3px solid blue; */
  font-size: 20px;
  margin-left: 10%;
  margin-right: 10%;
`;
