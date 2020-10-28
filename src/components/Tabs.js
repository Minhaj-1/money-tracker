import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Expenses from './Expenses/Expenses';
import Incomes from './Incomes/Incomes';
import expenseReducer from '../reducers/expenseReducer';
import { v4 } from 'uuid';
// import moment from 'moment';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [expenses, dispatch] = useReducer(
    expenseReducer,
    JSON.parse(localStorage.getItem('expenses')) || [
      {
        date: '10/23/2020',
        expenses: [
          { id: v4(), expenseFor: 'Food', date: '10/23/2020', amount: 100 },
          {
            id: v4(),
            expenseFor: 'Bike Fuel',
            date: '10/23/2020',
            amount: 200
          }
        ]
      },
      {
        date: '10/22/2020',
        expenses: [
          { id: v4(), expenseFor: 'Gup Chup', date: '10/22/2020', amount: 30 },
          {
            id: v4(),
            expenseFor: 'Bike Fuel',
            date: '10/22/2020',
            amount: 300
          }
        ]
      },
      {
        date: '10/21/2020',
        expenses: [
          { id: v4(), expenseFor: 'Gup Chup', date: '10/21/2020', amount: 30 },
          {
            id: v4(),
            expenseFor: 'Bike Fuel',
            date: '10/21/2020',
            amount: 300
          }
        ]
      }
    ]
  );
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        {/* <span>Money Tracker</span> */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'>
          <Tab label='Expenses' {...a11yProps(0)} />
          <Tab label='Incomes' {...a11yProps(1)} />
          <Tab label='Summary' {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Expenses expenses={expenses} dispatch={dispatch} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Incomes />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Summary
      </TabPanel>
    </div>
  );
}
