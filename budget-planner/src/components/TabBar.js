import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CustomerForm from './CustomerForm';
import DataTable from './DataTable'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{}}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Get Customer Spending" {...a11yProps(0)} />
          <Tab label="Get Customer Deposits" {...a11yProps(1)} />
          <Tab label="Get Customer Total Balance" {...a11yProps(2)} />
          <Tab label="Get Customer Total Loans" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0}>
        <CustomerForm description='View Customer Spending' value={[value]}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomerForm description='View Customer Deposits' value={[value]}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CustomerForm description='View Customer Total Balance' value={[value]}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CustomerForm description='View Customer Total Loans' value={[value]}/>
      </TabPanel>
      
    </div>
  );
}
