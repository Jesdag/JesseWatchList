import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FavButton from './../components/FavButton';
import WatchButton from './../components/WatchButton';
import GameSearchBar from './../components/GameSearchBar';
const GameDetails = () => {
  const [games, setGames] = useState(null);
  const [gameTrailers, setGameTrailers] = useState(null);

  const { id } = useParams();
  console.log(id);
  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
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
      <GameSearchBar />
      {!games ? (
        <div>
          <img
            src={
              'https://media.tenor.com/TlyRveJkgo4AAAAj/cloud-cloud-strife.gif'
            }
          />
        </div>
      ) : (
        <div>
          <h1>{games.name}</h1>
          <FavButton media={games} />
          <WatchButton media={games} />

          <img src={games.background_image} />
          <p>{games.description_raw}</p>
          <div>
            <p>
              {games.platforms.map((plat) => {
                return <div>{plat.platform.name}</div>;
              })}
            </p>
            <p> Rating: {games.metacritic}</p>
            <div>
              <p></p>
            </div>
            <div>
              <div>
                <div>
                  Where to Purchase:
                  {games.stores.map((store) => {
                    return (
                      <div>
                        {store.store.name}:<a>{store.store.domain}</a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default GameDetails;
