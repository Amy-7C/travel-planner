import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useToken from '../useToken';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function TripDetails() {
  const [tripInfo, setTripInfo] = useState({});
  const { token, setToken } = useToken();
  const { id } = useParams();
  const [ date, setDate ] = useState('');
  const [ dateList, setDateList] = useState([]);
  const fetchData = async () => {
    await fetch(`http://localhost:9000/api/trips/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    })
    .then(res => res.json())
    .then(data => {
      setTripInfo(data);
      console.log(data)
      createDateList(data.date_start, data.date_end);
    })
  }

  const createDateList = (startDate, endDate) => {
    const list = [];
    const diff = dayjs(endDate).diff(startDate, 'day');
    for(let i = 0; i <= diff; i++) {
      let value = dayjs(startDate).add(i, 'day').format('MMM D, YYYY');
      list.push(value);
    }
    setDateList(list);
  }

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <h1>{tripInfo.title}</h1>
      <h2>{tripInfo.city}, {tripInfo.country}</h2>
      <h3>{dayjs(tripInfo.date_start).format('MMMM D -')}{dayjs(tripInfo.date_end).format('MMMM D, YYYY')}</h3>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Dates</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={date}
            label="Dates"
            onChange={handleChange}
          > 
            {dateList.map((date, i) => (
              <MenuItem value={date} key={i}>{date}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained">Plan a Day</Button>
      </div>
    </div>
  )
}