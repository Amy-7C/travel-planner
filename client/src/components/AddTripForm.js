import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import useToken from '../useToken';
import './components.css';
import { isRouteErrorResponse } from 'react-router-dom';

async function createTrip(input, token) {
  return fetch('http://localhost:9000/api/trips', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }, 
    body: JSON.stringify(input)
  })
  .then(data => data.json())
}

export function AddTripForm(props) {
  const { token, setToken } = useToken();
  const [values, setValues] = useState({
    title: '',
    city: '', 
    country: ''
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [ error, setError ] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError([]);
    let formattedStartDate = dayjs(startDate).format('YYYY-MM-DD');
    let formattedEndDate = dayjs(endDate).format('YYYY-MM-DD');
    if(formattedStartDate === "Invalid Date" || formattedEndDate === "Invalid Date") {
      setError('Dates must be selected.')
      return;
    } 
    if (formattedEndDate < formattedStartDate) {
      setError('End date must be later than the start date.')
      return;
    }
    const tripInfo = {
      ...values,
      startDate: formattedStartDate, 
      endDate: formattedEndDate
    };
    const trip = await createTrip(tripInfo, token);
    if(trip) {
      props.fetchData();
      props.handleClose();
      return;
    }
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

  return(
    <Box sx={props.style} className="trip-form">
      <h2>Add Trip</h2>
      <div className="add-trip-form">
        <form onSubmit={handleSubmit} id="addtrip-form">
          <TextField 
            required
            id="standard-basic" 
            label="Title" 
            variant="standard" 
            name="title"
            value={values.title}
            onChange={handleInputChange}
          /><br />
          <LocalizationProvider dateAdapter={AdapterDayjs} className="datefield">
            <DemoContainer components={['DateField']}>
              <DateField 
                required={true}
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs} className="datefield">
            <DemoContainer components={['DateField']}>
              <DateField 
                required={true}
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)} />
            </DemoContainer>
          </LocalizationProvider>
          <TextField 
            required
            id="standard-basic" 
            label="City"
            variant="standard" 
            name="city"
            value={values.city}
            onChange={handleInputChange}
          /><br />
          <TextField
            required
            id="standard-basic" 
            label="Country"
            variant="standard" 
            name="country"
            value={values.country}
            onChange={handleInputChange}
          /><br />
          <Button variant="text" type="submit" value="submit" form="addtrip-form">Submit</Button><br/>
          <div style={{color: 'red', maxWidth: '200px'}}>{error}</div>
        </form>
      </div>
    </Box>
  )
}