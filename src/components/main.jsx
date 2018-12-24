import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home.jsx';
import Game from '../demo1/game.jsx';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/game1' component={Game}/>
    </Switch>
  </main>
);

export default Main;
