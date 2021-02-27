import logo from './logo.svg';
import './App.css';
import { Button, Form, FormControl, TextField } from '@material-ui/core' 
import CustomerForm from './components/CustomerForm'

const App = () => {
  return (
    <div>
      <FormControl>
        <CustomerForm/>
      </FormControl>
    </div>
  );
}

export default App;


