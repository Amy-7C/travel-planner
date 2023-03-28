import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useToken from '../useToken';
import dayjs from 'dayjs';

export function TripDetails() {
  const [tripInfo, setTripInfo] = useState({});
  const { token, setToken } = useToken();
  const { id } = useParams();

  const fetchData = async () => {
    await fetch(`http://localhost:9000/api/trips/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    })
    .then(res => res.json())
    .then(data => {
      setTripInfo(data)
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>{tripInfo.title}</h1>
      <h2>{tripInfo.city}, {tripInfo.country}</h2>
      <h3>{dayjs(tripInfo.date_start).format('MMMM D -')}{dayjs(tripInfo.date_end).format('MMMM D, YYYY')}</h3>
    </div>
  )
}