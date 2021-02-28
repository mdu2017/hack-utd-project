import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {useState} from 'react'
import axios  from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { activeGridFilterItemsSelector, DataGrid } from '@material-ui/data-grid';


// Form styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // margin: '1%'
  },
  textField: {
    display: 'flex',
    justifyContent: 'space-around',
    // padding: '10%'
  },
}));

const customerFormStyle = {
  padding: '2%',
}

const columns = [
  { field: 'AccountName', headerName: 'Account Name', width: 250 },
  { field: 'Type', headerName: 'Type', width: 150 },
  { field: 'Rewards', headerName: 'Rewards', width: 150 },
  {
    field: 'Balance',
    headerName: 'Balance',
    type: 'number',
    width: 150,
    
  },
  {
    field: 'customer_id',
    headerName: 'customer_id',
    description: 'This column should have the same value.',
    sortable: false,
    width: 200,
  },
]

const columnsPay = [
  { field: 'payer_id', headerName: 'Payer ID', width: 250 },
  { field: 'medium', headerName: 'Medium', width: 150 },
  { field: 'purchase_date', headerName: 'Purchase Date', type: 'date', width: 250 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 150},
  { field: 'status', headerName: 'Status', width: 200},
  { field: 'type', headerName: 'Type', width: 200},
]

const columnsDep = [
  { field: 'payee_id', headerName: 'Payee ID', width: 250 },
  { field: 'medium', headerName: 'Medium', width: 150 },
  { field: 'transaction_date', headerName: 'Transaction Date', type: 'date', width: 250 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 150},
  { field: 'status', headerName: 'Status', width: 200},
  { field: 'type', headerName: 'Type', width: 200},
]

const columnsLoan = [
  { field: 'type', headerName: 'Type', width: 250 },
  { field: 'creation_date', headerName: 'Creation Date', width: 150 },
  { field: 'status', headerName: 'Transaction Date', type: 'date', width: 250 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 150},
  { field: 'monthly_payment', headerName: 'Monthly Payment', type: 'number', width: 200},
]

const CustomerForm = ({description, value}) => {
  const classes = useStyles();

  const [popupOpen, setPopupOpen] = useState(false)
  const [customerID, setCustomerID] = useState('');

  const [customerBalance, setCustomerBalance] = useState(0)
  const [customerSpending, setCustomerSpending] = useState(0)
  const [customerDeposits, setCustomerDeposits] = useState(0)
  const [customerLoans, setCustomerLoans] = useState(0)
  const [customerName, setCustomerName] = useState('')

  const [customerAccts, setCustomerAccts] = useState([]);

  const [rows, setRows] = useState([]);

  // Get all accounts for a specific customer, then calculate spending
  const getCustomerSpending = async (customerID) => {

    let custSpending = 0
    let cnt = 0
    let finalList = []
    try{
      let accts = await axios.get(`http://api.nessieisreal.com/customers/${customerID}/accounts?key=${process.env.REACT_APP_API_KEY}`);

      if(accts.data.length > 0){
        
        for(const acct of accts.data){
          let spendings = await axios.get(`http://api.nessieisreal.com/accounts/${acct._id}/purchases?key=${process.env.REACT_APP_API_KEY}`);
        
          if(spendings.data.length > 0){
            for(const payment of spendings.data){

              if(payment['status'] != 'cancelled'){
              custSpending += payment['amount']
              }
              finalList.push({ id: cnt, payer_id: payment['payer_id'], medium: payment['medium'], purchase_date: payment['purchase_date'], 
                amount: payment['amount'], status: payment['status'], type: payment['type']})
              cnt += 1;
            }
          }
        }
      }

      setCustomerAccts(finalList)

      // Wait for state to be set
      await setCustomerSpending(custSpending) 
    }catch(error){
      console.log('no customer found')
    }
  }


  // Calculate total amount of deposits made for a customer
  const getCustomerDeposits = async (customerID) => {

    let custDeposits = 0
    let cnt = 0
    let finalList = []

    try{
    let accts = await axios.get(`http://api.nessieisreal.com/customers/${customerID}/accounts?key=${process.env.REACT_APP_API_KEY}`);

    if(accts.data.length > 0){
      for(const acct of accts.data){
        let deposits = await axios.get(`http://api.nessieisreal.com/accounts/${acct._id}/deposits?key=${process.env.REACT_APP_API_KEY}`);
        if(deposits.data.length > 0){
          for(const deposit of deposits.data){
            if(deposit['status'] != 'cancelled'){
              custDeposits += deposit['amount']
            }
            finalList.push({ id: cnt, payee_id: deposit['payee_id'], medium: deposit['medium'], transaction_date: deposit['transaction_date'], 
              amount: deposit['amount'], status: deposit['status'], type: deposit['type']})
            cnt += 1;
          }
        }
      }
      
      setCustomerAccts(finalList)
    }

    // Wait for state to be set
    await setCustomerDeposits(custDeposits) 
    }
    catch(error){
      console.log('no customer found')
    }
  }

  const getCustomerName = async (customerID) => {
    if (customerID == null || customerID == ''){
      return 404
    }


    try {
      let customer = await axios.get(`http://api.nessieisreal.com/customers/${customerID}?key=${process.env.REACT_APP_API_KEY}`);
      if(customer.data != null){
        let name = customer.data['first_name'] + ' ' + customer.data['last_name']
        setCustomerName(name)
        return true
      }
    } catch (error) {
      setCustomerName('')
      return error.response.status
    }
  }

  // Calculate total amount of deposits made for a customer
  const getCustomerTotalBalance = async (customerID) => {

    let totalBalance = 0
    let cnt = 0
    let finalList = []
    try {
      let accts = await axios.get(`http://api.nessieisreal.com/customers/${customerID}/accounts?key=${process.env.REACT_APP_API_KEY}`); 
        for(const acct of accts.data){
          totalBalance += acct.balance
          finalList.push({ id: cnt, AccountName: acct['nickname'], Type: acct['type'], Rewards: acct['rewards'], 
          Balance: acct['balance'], customer_id: acct['customer_id']})
          cnt += 1;
        }
        setCustomerAccts(finalList)
  
      setCustomerBalance(totalBalance)
    } catch (error) {
      console.log('no customer found')
      return
    }
  }

  const getCustomerLoans = async(customerID) => {
    let cnt = 0
    let finalList = []
    let totalLoans = 0
    try{
      let accts = await axios.get(`http://api.nessieisreal.com/customers/${customerID}/accounts?key=${process.env.REACT_APP_API_KEY}`);

      if(accts.data.length > 0){
        for(const acct of accts.data){
          let loans = await axios.get(`http://api.nessieisreal.com/accounts/${acct._id}/loans?key=${process.env.REACT_APP_API_KEY}`);
          if(loans.data.length > 0){
            for(const loan of loans.data){
              if(loan['status'] != 'declined' && loan['status'] != 'pending'){
                totalLoans += loan['amount']
              }
              finalList.push({ id: cnt, type: loan['type'], creation_date: loan['creation_date'], 
              status: loan['status'], amount: loan['amount'], monthly_payment: loan['monthly_payment']})
              cnt += 1;
            }
          }
        }
      }

      setCustomerLoans(totalLoans)
      setCustomerAccts(finalList)
    } catch (error) {
      console.log('no customer found')
      return
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()


    await getCustomerName(customerID); 
 
    
    // Customer Spending
    if(value[0] === 0){
      await getCustomerSpending(customerID);
    }
    else if(value[0] === 1){
      await getCustomerDeposits(customerID);
    }
    else if(value[0] === 2){
      await getCustomerTotalBalance(customerID)
    }
    else if(value[0] === 3){
      await getCustomerLoans(customerID)
    }
    
  }

  return (
    <div className={classes.root}>
      <div style={customerFormStyle}>

        <p><h2>{description}</h2></p>

        <form onSubmit={handleSubmit}>
          <TextField
            id="standard-full-width"
            value={customerID}
            label="Customer ID"
            placeholder='Customer ID'
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={e => setCustomerID(e.target.value)}
          />

            {/* Get customer spending button */}
            <Button variant="contained" color="primary" type='submit'>
              Submit
            </Button>

        </form>

        

        <h1>Customer Name: {customerName}</h1>
        {'\n'}
        { value == 0 ? <h1>Customer Total Spending: {'$' + customerSpending} </h1> : null}
        { value == 1 ? <h1>Customer Total Deposits: {'$' + customerDeposits} </h1> : null}
        { value == 2 ? <h1>Customer Total Balance: {'$' + customerBalance}  </h1> : null}
        { value == 3 ? <h1>Customer Total Loans: {'$' + customerLoans}  </h1> : null}
              
        </div> 
    
    { value == 0 ? <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={customerAccts} columns={columnsPay} pageSize={5} checkboxSelection/>
    </div> : null}

    { value == 1 ? <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={customerAccts} columns={columnsDep} pageSize={5} checkboxSelection/>
    </div> : null}

    { value == 2 ? <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={customerAccts} columns={columns} pageSize={5} checkboxSelection/>
      </div>  : null}

    { value == 3 ? <div style={{ height: 400, width: '100%' }}>
    <DataGrid rows={customerAccts} columns={columnsLoan} pageSize={5} checkboxSelection/>
    </div>  : null}
    
    </div>
  );
}

export default CustomerForm