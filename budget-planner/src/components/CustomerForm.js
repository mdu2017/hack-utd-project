import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import {useState} from 'react'
import axios  from "axios";
import DataTable from './DataTable'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


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


const CustomerForm = ({description, value}) => {
  const classes = useStyles();

  const [popupOpen, setPopupOpen] = useState(false)
  const [customerID, setCustomerID] = useState('');

  const [customerBalance, setCustomerBalance] = useState(0)
  const [customerSpending, setCustomerSpending] = useState(0)
  const [customerDeposits, setCustomerDeposits] = useState(0)
  const [customerName, setCustomerName] = useState('')

  // Get all accounts for a specific customer, then calculate spending
  const getCustomerSpending = async (customerID) => {

    let custSpending = 0
    try{
      let accts = await axios.get(`http://api.nessieisreal.com/customers/${customerID}/accounts?key=${process.env.REACT_APP_API_KEY}`);

      if(accts.data.length > 0){
        for(const acct of accts.data){
          let spendings = await axios.get(`http://api.nessieisreal.com/accounts/${acct._id}/purchases?key=${process.env.REACT_APP_API_KEY}`);

          if(spendings.data.length > 0){
            for(const payment of spendings.data){
              custSpending += payment['amount']
            }
          }
        }
      }

      // Wait for state to be set
      await setCustomerSpending(custSpending) 
    }catch(error){
      console.log('no customer found')
    }
  }


  // Calculate total amount of deposits made for a customer
  const getCustomerDeposits = async (customerID) => {

    let custDeposits = 0

    try{
    let accts = await axios.get(`http://api.nessieisreal.com/customers/${customerID}/accounts?key=${process.env.REACT_APP_API_KEY}`);

    if(accts.data.length > 0){

      for(const acct of accts.data){
        let deposits = await axios.get(`http://api.nessieisreal.com/accounts/${acct._id}/deposits?key=${process.env.REACT_APP_API_KEY}`);
        if(deposits.data.length > 0){
          for(const deposit of deposits.data){
            custDeposits += deposit['amount']
          }
        }
      }
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
      return
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
    }
  }

  // Calculate total amount of deposits made for a customer
  const getCustomerTotalBalance = async (customerID) => {

    let totalBalance = 0
    let accts = ''
    try {
      let accts = await axios.get(`http://api.nessieisreal.com/customers/${customerID}/accounts?key=${process.env.REACT_APP_API_KEY}`); 
      if(accts.data.length > 0){
        for(const acct of accts.data){
          totalBalance += acct.balance
        }
      }
  
      setCustomerBalance(totalBalance)
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
            <Button variant="contained" color="primary" type='submit' onClick={() => setPopupOpen(true)}>
              Submit
            </Button>

            {/*  Displays popup button if Get customer spending is clicked */}
            { popupOpen === true && getCustomerName(customerID) === true?
            <Snackbar open={true} autoHideDuration={6000} onClose={() => setPopupOpen(false)}>
                <Alert onClose={() => setPopupOpen(false)} severity="info">
                    Success!
                </Alert> 
            </Snackbar>
            : console.log('Nothing')}       
        </form>

        <h1>Customer Name: {customerName}</h1>
        {'\n'}
        { value == 0 ? <h1>Customer Total Spending: {'$' + customerSpending} </h1> : null}
        { value == 1 ? <h1>Customer Total Deposits: {'$' + customerDeposits} </h1> : null}
        { value == 2 ? <h1>Customer Total Balance: {'$' + customerBalance}  </h1> : null}
              
        </div> 

        <AccountBalanceIcon style={{ fontSize: '250px', paddingLeft: '50%' }}/>   
    </div>
  );
}

export default CustomerForm;
