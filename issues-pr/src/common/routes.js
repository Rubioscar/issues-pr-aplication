import React from "react";
import { Route, Redirect } from "react-router-dom";
import ListPage from "./pages/listPage";

export default () => (
  <>
    <Route path="/list" component={ListPage} />

    <Route exact path="/">
      <Redirect to="/list" />
    </Route>
  </>
);
