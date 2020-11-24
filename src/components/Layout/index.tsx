import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
  overflow: auto;
`;

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  );
};

export default Layout;
