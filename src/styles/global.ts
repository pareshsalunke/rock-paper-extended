import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
  /* apply a natural box layout model to all elements, but allowing components to change */
  html {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
  }
  
  *, *:before, *:after {
    box-sizing: border-box;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  // h1, h2, h3, h4, h5, h6 {
  //   margin: 0.8rem;
  // }
`;
