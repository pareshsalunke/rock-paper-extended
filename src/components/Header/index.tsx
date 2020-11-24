import React from 'react';
import styled from 'styled-components';
import GameLogo from 'assets/game-logo.svg';


const StyledHeader = styled.div`
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(0, 0, 0, 0.15) 100%
    ),
    radial-gradient(
        at top center,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(0, 0, 0, 0.4) 120%
      )
      #989898;
    background-blend-mode: multiply, multiply;
    z-index: 1;
    top: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: #000;
    width: 100%;
`;

const Header = () => {
  return (
    <StyledHeader>
      <img src={GameLogo} alt="Rock Paper Scissors" />
    </StyledHeader>
  );
};
export default Header;
