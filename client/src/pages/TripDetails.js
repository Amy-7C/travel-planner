import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useToken from '../useToken';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Days } from '../components/Days';

async function createDay(input, token, id) {
  return fetch(`http://localhost:9000/api/trips/${id}/days`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }, 
    body: JSON.stringify(input)
  })
  .then(data => data)
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
      setTripInfo(data);
      return data;
    }) 

    createDateList(dayRes, tripInfoRes.date_start, tripInfoRes.date_end);
  }

  const createDayList = (data) => {
    const list = [];
    for(const day of data) {
      const value = dayjs(day.date).format('MMM D, YYYY');
      list.push({
        ...day, 
        date: value
      });
    }

    list.sort((a,b) => (
      dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1
    ));

    setDays(list);
    return list;
  }

  const createDateList = (dayRes, startDate, endDate) => {
    const list = []
    if(dayRes && dayRes.length) {
      for(const day of dayRes) {
        list.push(day.date);
      }
    };

    const result = [];
    const diff = dayjs(endDate).diff(startDate, 'day');
    for(let i = 0; i <= diff; i++) {
      let value = dayjs(startDate).add(i, 'day').format('MMM D, YYYY');
      if(dayRes && dayRes.length && !list.includes(value)) result.push(value)
    }
    setDateList(result);
  }
  
  const handleChange = (event) => {
    setDate(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await createDay({date: date}, token, id);
    if(result?.constraint === 'day_unique') console.log("date already exists");
    else fetchData();
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
              style={{ width: '150px'}}
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
      <Days days={days} />
    </div>
  )
}