import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';

export function Signup({ token }) {
  const [values, setValues] = useState({
    username: '',
    password: '', 
    email: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("signup form")
  }

  function handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setValues((values) => ({
      ...values, 
      [name]: value
    }));
  }

  if (token) {
    return <Navigate to="/" replace />;
  }

  return(
    <div className="signup-wrapper">
      <h1>Signup</h1>
      <div className="signup-form">
        <form onSubmit={handleSubmit} id="signupform">
          <TextField 
              id="standard-basic" 
              label="Username" 
              variant="standard" 
              name="username"
              value={values.username}
              onChange={handleInputChange}
            /><br />
          <TextField 
            id="standard-basic" 
            label="Email" 
            variant="standard" 
            name="email"
            value={values.email}
            onChange={handleInputChange}
          /><br />
          <TextField 
            id="standard-basic" 
            label="Password" 
            variant="standard" 
            name="password"
            type="password"
            value={values.password}
            onChange={handleInputChange}
          /><br />
        </form>
        <Button variant="text" type="submit" value="submit" form="signupform">Submit</Button>
      </div>
    </div>
  )
}