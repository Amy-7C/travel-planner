import { Link } from 'react-router-dom';
import { SubHeader } from './SubHeader.js';
import Button from '@mui/material/Button';
import { PropTypes } from 'prop-types';
import './components.css';

export function Header({ token, setToken }) {

  function handleLogout() {
    localStorage.removeItem('token');
  }

  if(token) {
    return (
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <span style={{color: '#2B96ED'}}>travel</span><span>planner</span>
          </Link>
        </div>
        <SubHeader token={token} />
        <div>
          <a href='/'>
            <Button variant="text" onClick={handleLogout}>Log Out</Button>
          </a>
        </div>
      </div>
    )
  }
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <span style={{color: '#2B96ED'}}>travel</span><span>planner</span>
        </Link>   
      </div>
      <SubHeader token={token} />
      <div>
        <Link to="/signup" style={{marginRight: '10px'}}>
          <Button variant="text">Sign Up</Button>
        </Link>
        <Link to="/login">
          <Button variant="text">Login</Button>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  setToken: PropTypes.func.isRequired
}