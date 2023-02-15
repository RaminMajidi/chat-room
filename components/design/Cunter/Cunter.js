import CountUp from 'react-countup';
const Cunter =({start,end,duration,id})=>{

    return(
        <span key={id}>
        <CountUp  start={start} end={end} duration={duration}  />
        </span>
    )
}

export default Cunter