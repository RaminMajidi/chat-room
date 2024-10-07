import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import CallReceiverModal from '@components/calls/CallReceiverModal';
import CallSenderModal from '@components/calls/CallSenderModal';

const Calling = () => {

    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (!location.state) {
            return navigate('/404');
        }
        return window.history.replaceState({}, '');
    }, []);

    return (<>
        {location.state?.callReceiver && <CallReceiverModal />}
        {location.state?.callSender && <CallSenderModal />}
    </>);
}

export default Calling