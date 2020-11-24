import React from 'react';

import { RulesProvider } from 'providers/RuleSetProvider';
import Router from 'Router';
import GlobalStyles from 'styles/global';
import Header from './components/Header';

function App() {
  return (
    <RulesProvider>
      <GlobalStyles />
      <Header />
      <Router />
    </RulesProvider>
  );
}

export default App;
