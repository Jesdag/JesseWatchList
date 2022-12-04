import { useState, useEffect, useContext } from 'react';
import { useParams, useRouteLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from './../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import FavButton from '../components/FavButton';
import WatchButton from '../components/WatchButton';
// import styled, { keyframes } from 'styled-components';
import DynamicSwiper from '../swiper/DynamicSwiper';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [actorsInfo, setActorsInfo] = useState(null);
  const { userData, setFavIds, favIds } = useContext(UserContext);
  const { id } = useParams();
  // console.log(userData);

  const fetchHandler = async (string, callback) => {
    const res = await fetch(string);
    const json = await res.json();
    callback(json);
    const swiperArray = json.actorList.map((item) => {
      console.log(item);
      return { title: item.title, image: item.image };
    });
    console.log(swiperArray);
    setActorsInfo(swiperArray);
  };
  useEffect(() => {
    fetchHandler(
      `https://imdb-api.com/en/API/Title/${process.env.REACT_APP_IMDB}/${id}`,
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
          <StyledCard>
            <StyledPoster src={movie.image} />
            <div>
              <StyledFinish>
                <StyledPlot>
                  <h2>Plot</h2>
                  <StyledSpan> {movie.plot}</StyledSpan>
                </StyledPlot>
                <div>
                  Genres: <StyledSpan>{movie.genres}</StyledSpan>
                </div>
                <div>
                  Duration: <StyledSpan>{movie.runtimeStr}</StyledSpan>
                </div>
                <div>
                  <div>Directors: {movie.directors}</div>
                  <div>
                    Writen By: <StyledSpan>{movie.writers}</StyledSpan>
                  </div>
                </div>{' '}
                <div>
                  <h3>BoxOffice Gross Worldwide:</h3>
                  <div>
                    Onpening Weekend{' '}
                    <StyledSpan>
                      {movie.boxOffice.openingWeekendUSA} $
                    </StyledSpan>
                  </div>
                  <div>
                    Worldwide:{' '}
                    <StyledSpan>
                      {movie.boxOffice.cumulativeWorldwideGross} $
                    </StyledSpan>
                  </div>{' '}
                  <StyledInfo>
                    <div>
                      <h4>
                        Release Date{' '}
                        <StyledSpan>{movie.releaseDate}</StyledSpan>
                      </h4>
                    </div>
                  </StyledInfo>
                </div>
              </StyledFinish>
            </div>
          </StyledCard>
          <div>
            <StyledBtn>
              <FavButton media={movie} />
              <WatchButton media={movie} />
            </StyledBtn>
            <div>
              <h2>
                Score: <StyledRating>{movie.imDbRating}</StyledRating>
              </h2>

              <h2>{movie.companyList.name}</h2>

              <div>{movie.Rating}</div>
            </div>
          </div>

          <div>
            <h3>Cast:</h3>
            <StyledActorContainer>
              <DynamicSwiper array={actorsInfo} />
            </StyledActorContainer>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
export default MovieDetails;

const Wrapper = styled.div`
  font-size: 20px;
  /* border: 3px solid green; */
  display: flex;
  margin: auto;
  text-align: center;
  justify-content: center;
`;
const StyledSpan = styled.span`
  font-weight: 500;
  color: orange;
`;
const StyledInfo = styled.div`
  /* border: 3px solid green; */
  display: block;
  margin: 5px;
`;
const StyledPlot = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 3px solid purple; */
  width: 50vh;
  /* height: 9vh; */
  font-size: 20px;
  /* padding-bottom: 10px; */
`;
const StyledBtn = styled.div`
  display: flex;
  /* border: 2px solid blue; */
  justify-content: center;
  justify-content: space-evenly;
  padding-top: 8px;
`;
const StyledMovieTitle = styled.div`
  display: flex;
  justify-content: center;
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  /* font-family: 'Sacramento', cursive; */
  text-align: center;
  animation: blink 4s infinite;
  -webkit-animation: blink 6s infinite;
  text-decoration: underline;
`;
const StyledCard = styled.div`
  display: flex;
  /* justify-content: space-between; */
  /* border: 3px solid black; */
  border-radius: 5px;
  background-color: rgb(40, 40, 40);
  color: grey;
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
  /* gap: 10px; */
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  box-shadow: 0px 0px 32px 2px rgba(255, 166, 0, 0.9);
  margin-bottom: 15px;
`;
const StyledButton = styled.button`
  background-color: ${(props) => (props.toggled ? 'yellow' : 'red')};
`;
const StyledRating = styled.span`
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
const StyledFinish = styled.div`
  /* border: 4px solid yellow; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 15px;
  /* border: 3px solid black; */
  border-radius: 5px;
  /* background-color: white; */
`;
