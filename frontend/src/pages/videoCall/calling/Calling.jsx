import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"
import NotFound from '../../../components/errors/NotFound';
import GlassContainer from '../../../components/custom/GlassContainer';
import { useSocketContext } from '../../../context/SocketContext';
import useConversation from '../../../zustand/useConversation';
import { useAuthContext } from '../../../context/AuthContext';
import CallingModal from '../../../components/custom/CallingModal';


const Calling = () => {
    const location = useLocation();

    if (!location.state) {
        return <NotFound />
    }


    const [calling, setCalling] = useState(true);
    const { socket } = useSocketContext();
    const { authUser } = useAuthContext();

    useEffect(() => {
        console.log(location.state);
        if (location.state.callSender) {
            const receiver = location.state.receiverUser;
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
        <CallingModal />
    )
}

export default Calling