import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from './../context/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
const FavButton = ({ media }) => {
  const { userData, setFavIds, favIds } = useContext(UserContext);
  const { id, image, title, rating } = media;

  const handleFavorites = async () => {
    try {
      const result = await fetch('/api/favorites', {
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
      setFavIds(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledButton
      onClick={handleFavorites}
      toggled={favIds.includes(String(media.id))}
    >
      Add
    </StyledButton>
  );
};
const StyledButton = styled.button`
  background-color: ${(props) => (props.toggled ? 'red' : 'Green')};
`;
export default FavButton;
