import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"
import NotFound from '../../../components/errors/NotFound';
import GlassContainer from '../../../components/custom/GlassContainer';
import { useSocketContext } from '../../../context/SocketContext';
import useConversation from '../../../zustand/useConversation';
import { useAuthContext } from '../../../context/AuthContext';


const Calling = () => {
    const location = useLocation();

    if (!location.state) {
        return <NotFound />
    }


    const [calling, setCalling] = useState(true);
    const { socket } = useSocketContext();
    const { authUser } = useAuthContext();

    useEffect(() => {

        const receiver = location.state.user;
        const { token, userName, ...sender } = authUser;
        socket?.emit('calling', { receiver, sender })
        setTimeout(() => {
            setCalling(false)
        }, 60000)


        return window.history.replaceState({}, '');
    }, [])


    useEffect(() => {
        socket?.on("calling", (data) => {
            console.log(data);
        })
    }, [socket])



    return (
        <GlassContainer>
            {calling ? "Calling" : "Call End"}
        </GlassContainer>
    )
}

export default Calling