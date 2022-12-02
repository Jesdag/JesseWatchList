import { useState, useEffect, useContext } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import FavButton from '../components/FavButton';
const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();

  const { userData, setFavIds, favIds } = useContext(UserContext);
  const { id } = useParams();
  console.log(userData);

  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
  };
  useEffect(() => {
    fetchHandler(
      `https://imdb-api.com/en/API/Title/k_44cr6yag/${id}`,
      setMovie
    );
  }, [id]);

  const handleFavorites = async () => {
    try {
      const result = await fetch('/api/favorites', {
        method: 'PATCH',
        body: JSON.stringify({
          id: movie.id,
          email: userData.email,
          image: movie.image,
          rating: movie.imDbRating,
          title: movie.title,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const response = await result.json();
      setFavIds(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {!movie ? (
        <div>
          <img
            src={
              'https://tenor.com/view/cloud-cloud-strife-sword-sword-fight-brave-exvius-gif-23280799'
            }
          />
        </div>
      ) : (
        <div>
          <h1>{movie.title}</h1>
          <h3>Rated:{movie.contentRating}</h3>

          <StyledPoster src={movie.image} />

          <div>
            <div>
              <FavButton media={movie} />
            </div>
            <div>
              <h2>Score: {movie.imDbRating}</h2>
              <p>{movie.plot}</p>
              <h2>{movie.companyList.name}</h2>
              <p>Release Date: {movie.releaseDate}</p>
              <p>Duration: {movie.runtimeStr}</p>
              <p>{movie.Rating}</p>
              <p>Directors: {movie.directors}</p>
              <p>Writen By: {movie.writers}</p>
              <p>Genres: {movie.genres}</p>
            </div>
          </div>

          <div>
            <h3>BoxOffice Gross Worldwide:</h3>
            <div>Onpening Weekend {movie.boxOffice.openingWeekendUSA} $</div>
            <div>Worldwide: {movie.boxOffice.cumulativeWorldwideGross} $</div>
          </div>
          <div>
            <h3>Cast:</h3>
            <StyledActorContainer>
              {movie.actorList.map((actor) => {
                return (
                  <div>
                    <h3>{actor.name}</h3>
                    <StyledActorPics src={actor.image} />
                  </div>
                );
              })}
            </StyledActorContainer>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
export default MovieDetails;
const Wrapper = styled.div`
  text-decoration: none;
`;
const StyledActorContainer = styled.div`
  display: flex;
  text-decoration: none;
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
const StyledButton = styled.button`
  background-color: ${(props) => (props.toggled ? 'yellow' : 'red')};
`;
