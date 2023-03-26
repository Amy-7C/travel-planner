import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

async function signupUser(formData) {
  return fetch('http://localhost:9000/api/users', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(formData)
  })
    .then(data => data.json())
}

export function Signup({ token, setToken }) {
  const [values, setValues] = useState({
    username: '',
    password: '', 
    email: ''
  });

 async function handleSubmit(e) {
    e.preventDefault();
    const token = await signupUser(values);
    setToken(token);
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

Signup.propTypes = {
  setToken: PropTypes.func.isRequired
}