import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import FavButton from './../components/FavButton';
import WatchButton from './../components/WatchButton';
const TvDetails = () => {
  const [tvShow, setTvShow] = useState(null);
  const { id } = useParams();

  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
  };
  useEffect(() => {
    fetchHandler(
      `https://imdb-api.com/en/API/Title/k_44cr6yag/${id}`,
      setTvShow
    );
  }, [id]);
  console.log(tvShow);
  return (
    <>
      {!tvShow ? (
        <div>
          <img
            src={
              'https://media.tenor.com/TlyRveJkgo4AAAAj/cloud-cloud-strife.gif'
            }
          />
        </div>
      ) : (
        <div>
          <h1>{tvShow.title}</h1>

          <StyledPoster src={tvShow.image} />
          <h3>Rated: {tvShow.contentRating}</h3>
          <div>
            <h2>{tvShow.companyList[0].name}</h2>
            <FavButton media={tvShow} />
            <WatchButton media={tvShow} />
          </div>
          <div>
            <h2>{tvShow.imDbRating}</h2>
            <p>{tvShow.plot}</p>

            <p>Release Date: {tvShow.releaseDate}</p>
            <p>Show Creators: {tvShow.creators}</p>
            <p>Genres: {tvShow.genres}</p>
            <p>Stars: {tvShow.stars}</p>
          </div>

          <h3>Cast:</h3>
          <StyledActorContainer>
            {tvShow.actorList.map((actor) => {
              return (
                <div>
                  <h3>{actor.name}</h3>
                  <StyledActorPics src={actor.image} />
                </div>
              );
            })}
          </StyledActorContainer>
        </div>
      )}
    </>
  );
};
export default TvDetails;
const StyledActorContainer = styled.div`
  display: flex;
`;
const StyledActorPics = styled.img`
  width: 150px;
`;
const StyledPoster = styled.img`
  /* width: 175px; */
  height: 550px;
  gap: 10px;
  border-radius: 5px;
`;
