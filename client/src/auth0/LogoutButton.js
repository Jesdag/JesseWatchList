import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import styled from 'styled-components';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <StyledLogout onClick={() => logout()}>Sign-out</StyledLogout>
    )
  );
};

export default LogoutButton;
const StyledLogout = styled.button`
  width: 20px;
`;
