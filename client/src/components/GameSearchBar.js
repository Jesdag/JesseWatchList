import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import useDebounce from './../hooks/useDebounce';
const GameSearchBar = () => {
  const [gameQuery, setGameQuery] = useState('');
  const [gameResults, setGameResults] = useState([]);
  const debounceQuery = useDebounce(gameQuery, 500);
  console.log(debounceQuery.length);

  useEffect(() => {
    if (debounceQuery.length !== 0)
      fetch(
        `https://api.rawg.io/api/games?key=97930b3abde2449eb88423f0580c7725&search=${debounceQuery}&page_size=10`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (!data.errors) {
            setGameResults(data.results);
          } else {
            setGameResults([]);
          }
        });
  }, [debounceQuery]);

  const onChange = (ev) => {
    ev.preventDefault();
    setGameQuery(ev.target.value);
  };

  return (
    <>
      <Wrapper>
        <StyledContainer>
          <StyledSearchBox>
            <div>
              <input
                type='text'
                value={gameQuery}
                onChange={onChange}
                placeholder='Type to Search...'
              />
            </div>
            <span></span>
          </StyledSearchBox>
        </StyledContainer>

        <div>
          {gameQuery.length > 0 && (
            <ul>
              {gameResults &&
                gameResults.map((game) => {
                  return (
                    <NavLink to={`/games/${game.id}`}>
                      <li>{game.name}</li>
                    </NavLink>
                  );
                })}
            </ul>
          )}
        </div>
      </Wrapper>
    </>
  );
};
export default GameSearchBar;

const Wrapper = styled.div`
  text-align: center;
`;

const StyledContainer = styled.div``;
// const StyledDiv = styled.div``;
const StyledSearchBox = styled.div``;
