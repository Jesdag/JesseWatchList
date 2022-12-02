import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import styled from 'styled-components';
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <StyledDiv>
        <StyledPic src={user.picture} alt={user.name} />
        <StyledH2>{user.name}</StyledH2>
        {/* <p>{user.email}</p> */}
      </StyledDiv>
    )
  );
};

export default Profile;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;
const StyledPic = styled.img`
  border-radius: 50%;
  width: 25px;
  display: flex;
  /* border: 2px solid blue; */
  margin: 5px;
`;
const StyledH2 = styled.h2`
  font-size: 10px;
  color: white;
`;
