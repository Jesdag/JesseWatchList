import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './../context/UserContext';
const FavButton = ({ media }) => {
  const {
    userData,
    setEntertainmentIds,
    entertainmentIds,
    completeIds,
    setCompleteIds,
  } = useContext(UserContext);
  const { id, image, title, rating } = media;

  const handleComplete = async () => {
    try {
      const result = await fetch('/api/complete', {
        method: 'PATCH',
        body: JSON.stringify({
          id,
          email: userData.email,
          image,
          rating,
          title,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const response = await result.json();
      setEntertainmentIds(response.entertainmentArray);
      setCompleteIds(response.completeArray);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavorites = async () => {
    try {
      const result = await fetch('/api/currentEntertainment', {
        method: 'PATCH',
        body: JSON.stringify({
          id,
          email: userData.email,
          image,
          rating,
          title,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      const response = await result.json();
      setEntertainmentIds(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StyledButton
        onClick={handleFavorites}
        toggled={entertainmentIds.includes(String(media.id))}
        disabled={completeIds.includes(String(media.id))}
      >
        {completeIds.includes(String(media.id))
          ? 'Completed'
          : entertainmentIds.includes(String(media.id))
          ? 'Watched'
          : 'Watch'}
      </StyledButton>
      {entertainmentIds.includes(String(media.id)) && (
        <StyledEntertainmentButton
          onClick={handleComplete}
          toggled={entertainmentIds.includes(String(media.id))}
          disabled={completeIds.includes(String(media.id))}
        >
          Completed
        </StyledEntertainmentButton>
      )}
    </>
  );
};
const StyledButton = styled.button`
  background-color: ${(props) => (props.toggled ? 'yellow' : 'red')};
`;

const StyledEntertainmentButton = styled.button`
  /* background-color: ${(props) => (props.toggled ? 'yellow' : 'red')}; */
`;
export default FavButton;
