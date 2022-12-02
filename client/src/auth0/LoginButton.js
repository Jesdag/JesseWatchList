import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { styled } from 'styled-components';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  // console.log(isAuthenticated);

  return !isAuthenticated ? (
    <button onClick={() => loginWithRedirect()}>Log In</button>
  ) : (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Sign-out
    </button>
  );
};

export default LoginButton;
