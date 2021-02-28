import logo from './logo.svg';
import './App.css';
import { Button, Form, FormControl, TextField } from '@material-ui/core' 
import CustomerForm from './components/CustomerForm'
import TabBar from './components/TabBar'

require('dotenv').config()

const App = () => {
  return (
    <div>
      {/* <FormControl> */}
        <TabBar/>
      {/* </FormControl> */}
    </div>
  );
}

export default App;


