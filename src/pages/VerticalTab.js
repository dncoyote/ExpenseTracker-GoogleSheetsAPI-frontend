import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ onChangeTab, selectedTabIndex }) {
  // const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    // Call the onChangeTab function with the new tab index
    onChangeTab(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={selectedTabIndex} // Use the selectedTabIndex prop instead of local state
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="January 2023" {...a11yProps(0)} />
        <Tab label="February 2023" {...a11yProps(1)} />
        <Tab label="March 2023" {...a11yProps(2)} />
        <Tab label="April 2023" {...a11yProps(3)} />
        <Tab label="May 2023" {...a11yProps(4)} />
        <Tab label="June 2023" {...a11yProps(5)} />
        <Tab label="July 2023" {...a11yProps(6)} />
        <Tab label="August 2023" {...a11yProps(7)} />
        <Tab label="September 2023" {...a11yProps(8)} />
      </Tabs>
      {/* Add TabPanel components here if needed */}
    </Box>
  );
}
