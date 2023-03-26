import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import { Navigate } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('http://localhost:9000/api/users/login', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export function Login({ setToken, token }) {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const token = await loginUser(values);
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
    <div className="login-wrapper">
      <h1>Login</h1>
      <div className="login-form">
        <form onSubmit={handleSubmit} id="loginform">
          <TextField 
            id="standard-basic" 
            label="Username" 
            variant="standard" 
            name="username"
            value={values.username}
            onChange={handleInputChange}
          /><br />
          <TextField 
            id="standard-password-input" 
            label="Password"
            type="password" 
            variant="standard" 
            name="password"
            value={values.password}
            onChange={handleInputChange}
          />
        </form>
        <Button variant="text" type="submit" value="submit" form="loginform">Submit</Button>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}