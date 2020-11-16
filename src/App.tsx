import React from "react";
import { Switch, Route } from "react-router-dom";

import { Header } from "./components/header";
import { MoviesContainer as Home } from "./containers/home";
import { DetailContainer as Detail } from "./containers/detail";

export function App(): React.ReactElement {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail/:slug" component={Detail} />
      </Switch>
    </React.Fragment>
  );
}
