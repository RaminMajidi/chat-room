import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useCallHandlers from './useCallHandlers';
import useCallData from '../zustand/useCallData';
import { useAuthContext } from '../context/AuthContext';


const useCallListening = () => {

    const { socket } = useSocketContext();
    const { setIncomingCall, cancelIncomingCall, rejectOutgoingCall, answerOutgoingCall } = useCallHandlers();
    const { receiverUser, callId } = useCallData();
    const { authUser } = useAuthContext();


    // دریافت تماس
    useEffect(() => {
        socket?.on("receivingCall", user => setIncomingCall(user));
        socket?.on("cancelCall", _ => cancelIncomingCall());
        socket?.on("rejectCall", _ => rejectOutgoingCall());
        socket?.on("answerCall", data => answerOutgoingCall(data));


        return () => {
            socket?.off('receivingCall');
            socket?.off('cancelCall');
            socket?.off('rejectCall');
            socket?.off('answerCall');
        }
    }, [socket]);
    // ***

    // ارسال تماس
    useEffect(() => {
        if (receiverUser && !callId) {
            const { token, userName, ...sender } = authUser;
            socket?.emit('sendCalling', {
                receiverId: receiverUser._id,
                userCaller: sender
            });
        }
        return () => socket?.off('sendCalling');
    }, [receiverUser]);
    // ***

}

export default useCallListening;




















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