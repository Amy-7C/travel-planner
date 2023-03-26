import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AddTripForm } from '../components/AddTripForm';
import useToken from '../useToken';
import { TripList } from '../components/TripList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400, 
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export function MyTrips() {
  const { token, setToken } = useToken();
  const [trips, setTrips] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    await fetch('http://localhost:9000/api/trips', {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    })
    .then(res => res.json())
    .then(data => {
      setTrips(data.reverse());
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(trips.length) {
    return (
      <div className="mytrips">
        <div className="mytrips-wrapper">
          <Button onClick={handleOpen} variant="contained">Add Trip</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <AddTripForm style={style} fetchData={fetchData} handleClose={handleClose}/>
          </Modal>
          <TripList trips={trips} />
        </div>
      </div>
    )
  }

  return(
    <div>
      <div className="no-trips-img">
        <img src={require('../assets/no_trips.png')} width={800} alt="no-trips"/>
        <p>No trips yet :(</p>
        <Button onClick={handleOpen} variant="outlined">Add Trip</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <AddTripForm style={style} fetchData={fetchData} handleClose={handleClose}/>
        </Modal>
      </div>
    </div>
  )
}