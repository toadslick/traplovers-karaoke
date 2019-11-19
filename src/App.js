import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';
import RoomAuthProvider from './components/RoomAuthProvider';

const App = () => (
  <BrowserRouter>
    <RoomAuthProvider>
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
    </RoomAuthProvider>
  </BrowserRouter>
);

export default App;
