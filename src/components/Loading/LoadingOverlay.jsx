import React from "react";
import "./LoadingOverlay.scss";

const LoadingOverlay = ({ loading, type }) => {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loader" />
        <span>{type}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;