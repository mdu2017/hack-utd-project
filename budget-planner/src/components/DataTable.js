import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
});


function addSpending(custName, custSpending) {
  return {custName, custSpending};
}
function addDeposit(custName, custDeposit) {
    return {custName, custDeposit};
  }

const rows = []

const DataTable = ({custName, custSpending, custDep, value}) => {
  const classes = useStyles();

  return (
      <div>
          <p>{custName}</p>
          {value === 0 ? <h1>{custSpending}</h1> : <h1></h1>}
          {value === 1 ? <h1>{custDep}</h1> : <h1></h1>}

      </div>
    
    // <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell ><h2>Customer Name</h2></TableCell>
    //         <TableCell ><h2>Total Balance</h2></TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <TableRow key={row.customerName}>
    //           <TableCell component="th" scope="row">
    //             {row.customerName}
    //           </TableCell>
    //           <TableCell>{row.totalBalance}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}

export default DataTable
