import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useDebounce from './../hooks/useDebounce';
import { BiSearch } from 'react-icons/bi';
import Profile from '../auth0/Profile';
import { useLocation, useNavigate } from 'react-router-dom';
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debounceQuery = useDebounce(query, 2000);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);

  useEffect(() => {
    if (debounceQuery.length !== 0) {
      if (pathname.includes(`/games`)) {
        fetch(
          `https://api.rawg.io/api/games?key=97930b3abde2449eb88423f0580c7725&search=${debounceQuery}&page_size=10`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (!data.errors) {
              const mapData = data.results.map((result) => {
                return { id: result.id, title: result.name };
              });
              setResults(mapData);
            } else {
              setResults([]);
            }
          });
      } else {
        fetch(
          `https://imdb-api.com/en/API/SearchMovie/${process.env.REACT_APP_IMDB}/${debounceQuery}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (!data.errors) {
              setResults(data.results);
            } else {
              setResults([]);
            }
          });
      }
    }
  }, [debounceQuery]);

  const onChange = (ev) => {
    ev.preventDefault();
    setQuery(ev.target.value);

    console.log(results);
  };

  return (
    <Wrapper>
      <StyledWatchList>Watch-List</StyledWatchList>

      <Form>
        <div className='SearchContainer'>
          <StyledInput
            type='text'
            value={query}
            onChange={onChange}
            placeholder='Type to Search...'
          />
          <BiSearch className='mag' />
        </div>
        {query.length > 0 && (
          <StyledUl>
            <StyledList show={results.length > 0}>
              {results &&
                results.map((movie) => {
                  return (
                    <LinkStyle>
                      <button
                        onClick={() => {
                          setQuery('');
                          pathname.includes(`/games`)
                            ? navigate(`/games/${movie.id}`)
                            : navigate(`/movies/${movie.id}`);
                        }}
                      >
                        <li>{movie.title}</li>
                      </button>
                    </LinkStyle>
                  );
                })}
            </StyledList>
          </StyledUl>
        )}
      </Form>
      <StyledProfile>
        <Profile />
      </StyledProfile>
    </Wrapper>
  );
};
const LinkStyle = styled.div`
  .NavLink {
    text-decoration: none;
  }
`;
const StyledList = styled.div`
  background: white;
  text-align: center;
  /* margin-right: 28px; */
  border-radius: 5px;
  padding: ${(props) => (props.show ? '40px 20px 20px' : '0px')};
`;
const StyledUl = styled.ul`
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;
const StyledProfile = styled.div`
  display: flex;
  text-align: center;
  /* margin: 5px; */
  width: 100px;
  /* border: 2px solid pink; */
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  height: 10vh;
  width: 100%;
  background: rgb(40, 40, 40);
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 7px,
    rgba(0, 0, 0, 0.8) 9px,
    rgba(0, 0, 0, 0.8) 13px,
    transparent 13px
  );
  @-webkit-keyframes blink {
    20%,
    24%,
    55% {
      color: #111;
      text-shadow: none;
    }

    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
      /*     color: #fccaff;
    text-shadow: 0 0 5px #f562ff, 0 0 15px #f562ff, 0 0 25px #f562ff,
      0 0 20px #f562ff, 0 0 30px #890092, 0 0 80px #890092, 0 0 80px #890092; */
      text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
        0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
      color: #fff6a9;
    }
  }

  @keyframes blink {
    20%,
    24%,
    55% {
      color: #111;
      text-shadow: none;
    }

    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
      /*     color: #fccaff;
    text-shadow: 0 0 5px #f562ff, 0 0 15px #f562ff, 0 0 25px #f562ff,
      0 0 20px #f562ff, 0 0 30px #890092, 0 0 80px #890092, 0 0 80px #890092; */
      text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
        0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
      color: #fff6a9;
    }
  }
`;

const Form = styled.div`
  /* display: flex;
  flex-direction: column; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 1s;
  width: 50px;
  height: 50px;
  background: white;
  box-sizing: border-box;
  border-radius: 25px;
  border: 4px solid white;
  padding: 5px;
  /* margin-top: 50px; */
  .SearchContainer {
    z-index: 2;
    /* position: relative; */
  }
  .mag {
    box-sizing: border-box;

    padding: 10px;
    width: 42.5px;
    height: 42.5px;
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    color: #07051a;
    text-align: center;
    font-size: 1.2em;
    transition: all 1s;
  }
  ul {
    opacity: 0;
    /* display: none; */
    z-index: -1;
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    /* width: 50px; */
    padding: 0;
  }
  &:hover {
    width: 300px;
    cursor: pointer;

    ul {
      -webkit-animation: 1s ease 0s normal forwards 1 fadein;
      animation: 1s ease 0s normal forwards 1 fadein;
      display: block;
      /* width: 300px; */
    }
    @keyframes fadein {
      0% {
        width: 50px;

        opacity: 0;
      }
      19% {
        opacity: 0;
      }
      100% {
        width: 300px;

        opacity: 1;
      }
    }

    @-webkit-keyframes fadein {
      0% {
        opacity: 0;
      }
      19% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  &:hover input {
    display: block;
  }

  &:hover .mag {
    background: #07051a;
    color: white;
  }
`;
const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 42.5px;
  line-height: 30px;
  outline: 0;
  border: 0;
  display: none;
  font-size: 1em;
  border-radius: 20px;
  /* padding: 0 20px; */
`;

const StyledWatchList = styled.h1`
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
  margin-left: 10px;
`;

export default SearchBar;
