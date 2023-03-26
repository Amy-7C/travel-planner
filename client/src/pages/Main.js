import { Slider } from '../components/Slider.js';

export function Main() {
  return(
    <div className="main">
      <div className="main-column-wrapper">      
        <div className="text-over-main">
          <div>A travel management app that makes it easy to organize your trip itineraries. 
          Start planning today!</div>
          {/* <button><Link to="/signup">Sign Up</Link></button> */}
        </div>
        <div className="landingpage-img">
          <img src={require('../assets/landing-page-main.jpg')} alt="switzerland"/>
        </div>
      </div>
      <div className="more-places">
        <h1>Where to next?</h1>
        <Slider />
      </div>
    </div>
  )
}