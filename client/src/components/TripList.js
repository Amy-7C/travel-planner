import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export function TripList({trips}) {
  return (
    <Box sx={{ flexGrow: 1 }} marginTop="15px">
      <Grid container spacing={2}>
        {trips.length > 0 && (
          trips.map(trip => (
            <Grid xs={12} key={trip.trip_id}>
              <Item>
                <h2>{trip.title}</h2>
                <p>{trip.city},&nbsp;{trip.country} - {dayjs(trip.date_start).format('MMM D')} - {dayjs(trip.date_end).format('MMM D, YYYY')}</p>
              </Item>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  )
}