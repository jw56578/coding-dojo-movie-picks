import './App.css';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import React from 'react';
import Header from './components/Header';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <>
    <Router>
      <Header/>
      <Switch>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/search/:id">
          <Search />
        </Route>
        <Route path="/">
          <Search />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
