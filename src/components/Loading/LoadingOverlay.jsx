import React from "react";
import "./LoadingOverlay.css";

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loader" />
        <span>Please wait...</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;