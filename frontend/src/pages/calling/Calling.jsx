import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"
import NotFound from '@components/errors/NotFound';
import GlassContainer from '@components/custom/GlassContainer';
import CallReceiverModal from '@components/calls/CallReceiverModal';
import { useSocketContext } from '@src/context/SocketContext';
import useConversation from '@src/zustand/useConversation';
import { useAuthContext } from '@src/context/AuthContext';
import CallSenderModal from '../../components/calls/CallSenderModal';
import useCallData from '../../zustand/useCallData';


const Calling = () => {
    const location = useLocation();

    if (!location.state) {
        return <NotFound />
    }

    const { receiverUser } = useCallData();
    const [calling, setCalling] = useState(true);
    const { socket } = useSocketContext();
    const { authUser } = useAuthContext();

    useEffect(() => {
        console.log(location.state);
        if (location.state.callSender) {
            const receiver = receiverUser;
            const { token, userName, ...sender } = authUser;
            socket?.emit('calling', { receiver, sender })
            setTimeout(() => {
                setCalling(false)
            }, 60000)
        }




        return window.history.replaceState({}, '');
    }, [location.state])


    useEffect(() => {
        socket?.on("calling", (data) => {
            console.log(data);
        })
    }, [socket])



    return (
        <>
            {location.state.callReceiver && <CallReceiverModal />}
            {location.state.callSender && <CallSenderModal />}
        </>

    );
}

export default Calling