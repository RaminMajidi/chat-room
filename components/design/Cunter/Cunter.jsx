import CountUp from 'react-countup';
import ReactVisibilitySensor from 'react-visibility-sensor';
import VisibilitySensor from 'react-visibility-sensor';


const Cunter =({start,end,duration,id})=>{

    return(
        <VisibilitySensor partialVisibility offset={{ top: 500 }} scrollCheck={true} scrollDelay={300}>
            {({isVisible}) =>
              <span key={id}>
                <CountUp  start={start} end={end} duration={duration}  />
              </span>
            }
        </VisibilitySensor>
    )
}

export default Cunter