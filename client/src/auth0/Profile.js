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
  width: 80px;
  /* margin-top: 15px; */
`;
const StyledPic = styled.img`
  border-radius: 50%;
  width: 45px;
  margin: auto;
  margin-left: 5px;
  /* border: 2px solid #ffa500; */
`;
const StyledH2 = styled.h2`
  font-size: 15px;
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  font-family: 'Sacramento', cursive;
  text-align: center;
  animation: blink 12s infinite;
  -webkit-animation: blink 12s infinite;
  margin-left: 10px;
`;
