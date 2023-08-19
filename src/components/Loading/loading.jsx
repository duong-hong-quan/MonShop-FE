import React from 'react';
import './loading.css'; // Đảm bảo bạn đã tạo file CSS để căn giữa phù hợp

const LoadingCenter = ({ loading }) => {
  return (

    <div className="loading-center-container" style={{ display: loading ? 'flex' : 'none' }}>
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingCenter;
