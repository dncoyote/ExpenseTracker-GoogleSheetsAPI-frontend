import React from 'react';

const HomeBanner = ({ selectedMonth }) => {
  return (
    <div className="month-banner">
      <h2>{selectedMonth}</h2>
    </div>
  );
};

export default HomeBanner;