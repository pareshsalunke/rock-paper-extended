import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from 'pages/Home';
import Play from 'pages/Play';
import Layout from './components/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
