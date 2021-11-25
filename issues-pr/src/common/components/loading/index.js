import "scss/loading.scss";
import React from "react";
import Spinner from "common/components/loading/spinner";

const Loading = () => (
  <>
    <div className="spinner-modal-bg" />
    <div className="spinner-container">
      <Spinner />
    </div>
  </>
);

export default Loading;
