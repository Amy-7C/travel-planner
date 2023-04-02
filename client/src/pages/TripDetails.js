import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useToken from '../useToken';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

async function createDay(input, token, id) {
  console.log(input);
  return fetch(`http://localhost:9000/api/trips/${id}/days`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }, 
    body: JSON.stringify(input)
  })
  .then(data => data.json())
}

export function TripDetails() {
  const [tripInfo, setTripInfo] = useState({});
  const [days, setDays] = useState([]);
  const { token, setToken } = useToken();
  const { id } = useParams();
  const [ date, setDate ] = useState('');
  const [ dateList, setDateList] = useState([]);

  const fetchData = async () => {
    const dayRes = await fetch(`http://localhost:9000/api/trips/${id}/days`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    })
    .then(res => res.json())
    .then(data => {
      return createDayList(data);
    });

    const tripInfoRes = await fetch(`http://localhost:9000/api/trips/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    })
    .then(res => res.json())
    .then(data => {
      return data;
    }) 

    createDateList(dayRes, tripInfoRes.date_start, tripInfoRes.date_end);
  }

  const createDayList = (data) => {
    const list = [];
    for(const day of data) {
      const value = dayjs(day.date).format('MMM D, YYYY');
      list.push(value)
    }
    setDays(list);
    return list;
  }

  const createDateList = (dayRes, startDate, endDate) => {
    console.log(dayRes)
    const list = [];
    const diff = dayjs(endDate).diff(startDate, 'day');
    for(let i = 0; i <= diff; i++) {
      let value = dayjs(startDate).add(i, 'day').format('MMM D, YYYY');
      if(dayRes.includes(value)) continue;
      else list.push(value);
    }
    setDateList(list);
  }

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await createDay({date: date}, token, id);
    if(result?.constraint === 'day_unique') console.log("already a date exists");
    else console.log(result)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
      <h1>{tripInfo.title}</h1>
      <h2>{tripInfo.city}, {tripInfo.country}</h2>
      <h3>{dayjs(tripInfo.date_start).format('MMMM D -')}{dayjs(tripInfo.date_end).format('MMMM D, YYYY')}</h3>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <form id="add-date-form" onSubmit={handleSubmit}>
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
        </form>
        <Button variant="contained" type="submit" value="submit" form="add-date-form">Plan a Day</Button>
      </div>
    </div>
  )
}