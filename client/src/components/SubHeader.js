import { NavLink } from 'react-router-dom';

export function SubHeader({ token }) {
  if(token === undefined) {
    return <div></div>
  } 
  return(
    <div className="main-links"> 
      <ul>
        {/* <li><NavLink to="/" className={(navData) => (navData.isActive ? "active nav-links" : "nav-links")}>Explore</NavLink></li> */}
        <li><NavLink to="/mytrips" className={(navData) => (navData.isActive ? "active nav-links" : "nav-links")}>My Trips</NavLink></li>
        {/* <li><NavLink to="/bucketlist" className={(navData) => (navData.isActive ? "active nav-links" : "nav-links")}>Bucket List</NavLink></li> */}
      </ul>
    </div>
  )
}