import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

async function deleteTrip(tripId, token, setMessage) {
  setMessage('');
  return fetch(`http://localhost:9000/api/trips/${tripId}`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token
    }
  })
    .then(data => {
      // if(data.status === 204) setMessage('successfully deleted');
      // else 
      if (data.status === 404) setMessage('trip not found');
      else if (data.status === 400) setMessage('unable to delete')
    })
}

export function TripList({trips, token, setMessage, fetchData}) {

  async function handleDelete(e, tripId) {
    e.preventDefault(); 
    const result = await deleteTrip(tripId, token, setMessage);
    fetchData();
    return result;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {trips.length > 0 && (
          trips.map(trip => (
            <Link to={`/mytrips/${trip.trip_id}`}>
            <Box xs={12} key={trip.trip_id} marginRight="15px" marginTop="15px">
              <Item>
                <div>
                  <h2>{trip.title}</h2>
                  <p>{trip.city},&nbsp;{trip.country} - {dayjs(trip.date_start).format('MMM D')} - {dayjs(trip.date_end).format('MMM D, YYYY')}</p>
                </div>
                <button onClick={(e) => handleDelete(e, trip.trip_id)} style={{border: 'none', background: 'white'}}><DeleteIcon /></button>
              </Item>
            </Box>
            </Link>
          ))
        )}
      </Grid>
    </Box>
  )
}

TripList.propTypes = {
  setToken: PropTypes.func.isRequired
}