import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import {useState} from 'react'

// Form styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));


const CustomerForm = ({description}) => {
  const classes = useStyles();

  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <div className={classes.root}>
      <div>

        <p><h2>{description}</h2></p>

        <TextField
          id="standard-full-width"
          label="Customer ID"
        //   style={{ margin: 8 }}
          placeholder='Customer ID'
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Get customer spending button */}
        <Button variant="contained" color="primary" onClick={() => setPopupOpen(true)}>
          Submit
        </Button>

          {/*  Displays popup button if Get customer spending is clicked */}
        { popupOpen === true ?
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setPopupOpen(false)}>
            <Alert onClose={() => setPopupOpen(false)} severity="info">
                Success!
            </Alert> 
        </Snackbar>
        : console.log('Nothing')}
      </div>
    </div>
  );
}

export default CustomerForm;
