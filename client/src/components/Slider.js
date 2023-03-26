import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocation } from 'react-router-dom';

export function Slider() {
  let location = useLocation();

  function handleSliderButton(loc) {
    if(loc.hash === '' || loc.hash === "#section1") {
      window.location.href = '/#section2';
    } else if(loc.hash === "#section2") {
      window.location.href = '/#section1';
    } 
  }

  return(
    <div className="slider-main">
      <div className="places-slider">
        <section id="section1">
          <div className="places-card">
            <div className="text-over-card">France</div>
            <div className="places-img-wrapper"> 
              <img src={require('../assets/france.jpg')} width={350} alt="france"/>
            </div>       
          </div>
          <div className="places-card">
            <div className="text-over-card">Iceland</div>
            <div className="places-img-wrapper"> 
              <img src={require('../assets/iceland.jpg')} width={350} alt="iceland"/>
            </div>
          </div>
          <div className="places-card">
            <div className="text-over-card">Greece</div>
            <div className="places-img-wrapper"> 
              <img src={require('../assets/greece.jpg')} width={350} alt="greece"/>
            </div>
          </div>
        </section>
        <section id="section2">
          <div className="places-card">
            <div className="text-over-card">Las Vegas</div>
            <div className="places-img-wrapper"> 
              <img src={require('../assets/lasvegas.jpg')} width={350} alt="lasvegas"/>
            </div>
          </div>
          <div className="places-card">
            <div className="text-over-card">Morocco</div>
            <div className="places-img-wrapper"> 
              <img src={require('../assets/morocco.jpg')} width={350} alt="morocco"/>
            </div>
          </div>
          <div className="places-card">
            <div className="text-over-card">New York</div>
            <div className="places-img-wrapper"> 
              <img src={require('../assets/nyc.jpg')} width={350} alt="nyc"/>
            </div>
          </div>
        </section>
      </div>
      <button className="slider-btn-left" onClick={() => handleSliderButton(location)}><ArrowBackIosIcon /></button>
      <button className="slider-btn-right" onClick={() => handleSliderButton(location)}><ArrowForwardIosIcon /></button>
    </div>

  )
}