import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useCallHandlers from './useCallHandlers';


const useListenCalling = () => {

    const { socket } = useSocketContext();
    const { setIncomingCall } = useCallHandlers();

    useEffect(() => {
        console.log("useListenCalling");
        socket?.on("receivingCall", user => setIncomingCall(user))
        return () => socket?.off('receivingCall');
    }, [socket])

}

export default useListenCalling;




















// import { useEffect, useState } from 'react'
// import { useSocketContext } from '../context/SocketContext'
// import useConversation from '../zustand/useConversation'
// import notificationSound from "../assets/sounds/notification.mp3"
// import { useAuthContext } from '../context/AuthContext'
// import useGetConversation from './useGetConversation'
// import { messageAlert } from '../utils/Alerts'


// const useListenVideoCall = () => {
//     const { socket } = useSocketContext();
//     const [stream, setStream] = useState()
//     const [calling, setCalling] = useState(false);
//     const [callAccepted, setCallAccepted] = useState(null)
//     const { selectedConversation } = useConversation();
//     const { authUser } = useAuthContext();
//     const { conversations } = useGetConversation();

//     useEffect(() => {
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then((stream) => {
//                 setStream(stream)
//                 myVideo.current.srcObject = stream
//             });





//         socket?.on('callUser', (data) => {
//             console.log(data);
//         });
//         return () => socket?.off('callUser');
//     }, [socket])

// }

// export default useListenVideoCall



// if (active) {

// } else {
//     stream?.getTracks().forEach((track) => {
//         track.stop();
//     });
// }