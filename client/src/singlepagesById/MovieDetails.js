import { useState, useEffect, useContext } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import FavButton from '../components/FavButton';
import WatchButton from '../components/WatchButton';
// import styled, { keyframes } from 'styled-components';

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
          <StyledMovieTitle>
            <h1>{movie.title}</h1>
          </StyledMovieTitle>
          <h3>Rated:{movie.contentRating}</h3>
          <StyledPoster src={movie.image} />

          <div>
            <StyledBtn>
              <FavButton media={movie} />
              <WatchButton media={movie} />
            </StyledBtn>
            <div>
              <h2>
                Score: <StyledRating>{movie.imDbRating}</StyledRating>
              </h2>
              <div>
                <h2>Plot:</h2>
                {movie.plot}
              </div>
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
  border: 3px solid green;
  display: flex;
  margin: auto;
  text-align: center;
`;
const StyledBtn = styled.div`
  display: flex;
  border: 2px solid blue;
  justify-content: center;
  justify-content: space-evenly;
  padding-top: 8px;
`;
const StyledMovieTitle = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledActorContainer = styled.div`
  text-decoration: none;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
`;
const StyledActorPics = styled.img`
  width: 150px;
`;
const StyledPoster = styled.img`
  /* width: 175px; */
  height: 45rem;
  gap: 10px;
  border-radius: 5px;
`;
const StyledButton = styled.button`
  background-color: ${(props) => (props.toggled ? 'yellow' : 'red')};
`;
const StyledRating = styled.span`
  font-size: 80px;
  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;
  @-webkit-keyframes glow {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
        0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
        0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
    }
  }
`;
