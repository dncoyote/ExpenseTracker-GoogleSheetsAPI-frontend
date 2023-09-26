import React, { useState } from 'react';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = [2023]; // Add your desired years

const VerticalTabs = ({ onChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    const selectedMonth = months[index % 12];
    const selectedYear = years[Math.floor(index / 12)];
    onChange(selectedMonth, selectedYear);
  };

  return (
    <div className="vertical-tabs">
      {years.map((year) =>
        months.map((month, index) => (
          <div
            key={`${year}-${month}`}
            className={`tab ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {`${month} ${year}`}
          </div>
        ))
      )}
    </div>
  );
};

export default VerticalTabs;