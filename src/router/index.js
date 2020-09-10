import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Welcome, Login, Home } from "../containers";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Welcome}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
        </Switch>
      </Router>
    );
  }
}
