import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"
import NotFound from '../../components/errors/NotFound';
import GlassContainer from '../../components/custom/GlassContainer';


const Calling = () => {
    const location = useLocation();

    if (!location.state) {
        return <NotFound />
    }

    const [calling, setCalling] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            setCalling(false)
        }, 60000)

        return window.history.replaceState({}, '');
    }, [])



    return (
        <GlassContainer>
            {calling ? "Calling" : "Call End"}
        </GlassContainer>
    )
}

export default Calling