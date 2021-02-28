import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from './pages/home';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path='/default' render={() => <Redirect to= "/" />} />
      </Switch>
    </div>
  );
}