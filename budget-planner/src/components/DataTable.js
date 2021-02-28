import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {useState, useEffect} from 'react';

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
});


function addAcct(id, name, type, rewards, balance, custID) {
  return {id, name, type, rewards, balance, custID};
}

const rows = []

const DataTable = ({customerAccts}) => {
  const classes = useStyles();

   // Similar to componentDidMount and componentDidUpdate:
   useEffect(() => {
    // Update the rows using customer account data
    // const {id, nickname, type, rewards, balance, customer_id} = customerAccts
    // rows.push(addAcct(customerAccts._id, customerAccts.nickname, 
    //     customerAccts.type, customerAccts.rewards, 
    //     customerAccts.balance, customerAccts.customer_id))
  });

  return (
      <div>
          <h1>{customerAccts}{console.log({customerAccts})}</h1>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ><h3>Account Name</h3></TableCell>
            <TableCell ><h3>Type</h3></TableCell>
            <TableCell ><h3>Rewards</h3></TableCell>
            <TableCell ><h3>Balancee</h3></TableCell>
            <TableCell ><h3>Customer ID</h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.nickname}
              </TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.rewards}</TableCell>
              <TableCell>{row.balance}</TableCell>
              <TableCell>{row.customer_id}</TableCell>
            </TableRow>
          ))} */}
         </TableBody>
      </Table>
    </TableContainer> 
    </div>
  );
}

export default DataTable
