import React from "react";
import { Switch } from "react-router-dom";
import Routes from "common/routes";
import { useSelector } from "react-redux";
import Loading from "common/components/loading";
import Header from "./header";

const Layout = () => {
  const loading = useSelector((state) => state.loading);

  return (
    <>
      <Header />

      {loading && <Loading />}

      <div className="containerAplication">
        <Switch>
          <Routes />
        </Switch>
      </div>
    </>
  );
};

export default Layout;
