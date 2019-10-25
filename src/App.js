import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Switch>
        {routes.map(({ Component, path }) => (
          <Route exact={true} key={path} path={path}>
            <Component />
          </Route>
        ))}
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
