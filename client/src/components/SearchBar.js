import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useDebounce from './../hooks/useDebounce';
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debounceQuery = useDebounce(query, 500);
  console.log(debounceQuery.length);

  useEffect(() => {
    if (debounceQuery.length !== 0)
      fetch(
        `https://imdb-api.com/en/API/SearchMovie/k_44cr6yag/${debounceQuery}`
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
  }, [debounceQuery]);

  const onChange = (ev) => {
    ev.preventDefault();
    setQuery(ev.target.value);

    console.log(results);
  };

  return (
    <Wrapper>
      {/* <StyledWatchList>
        <h1>Watch-List</h1>
      </StyledWatchList> */}
      <StyledContainer>
        <StyledSearchBox>
          <div>
            <input
              type='text'
              value={query}
              onChange={onChange}
              placeholder='Type to Search...'
            />
          </div>
          <span></span>
        </StyledSearchBox>
      </StyledContainer>

      <div>
        {query.length > 0 && (
          <ul>
            {results &&
              results.map((movie) => {
                return <li>{movie.title}</li>;
              })}
          </ul>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 10vh;
  /* margin-right: 20px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(40, 40, 40);
  border: 3px solid green;
  text-align: center;
  input {
    width: 350px;
    height: 30px;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
  }
`;
// const StyledWatchList = styled.div`
//   display: flex;
//   justify-content: start;
//   font-size: 18px;
//   font-family: 'Sacramento', sans-serif;
//   /* background-color: #010a01; */
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   h1 {
//     text-align: center;
//     color: #00d0ff;
//     text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #00d0ff,
//       0 0 82px #00d0ff, 0 0 92px #00d0ff, 0 0 102px #00d0ff, 0 0 151px #00d0ff;
//     border: 0.2rem solid #fff;
//     border-radius: 20px;
//     padding: 0.4em;
//     box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #00d0ff,
//       0 0 0.8rem #00d0ff, 0 0 2.8rem #00d0ff, inset 0 0 1.3rem #00d0ff;
//     font-size: 2.8rem;
//     animation: pulsate 1.5s infinite alternate;
//   }
// `;

const StyledContainer = styled.div``;
// const StyledDiv = styled.div``;
const StyledSearchBox = styled.div``;

export default SearchBar;
