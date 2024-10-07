import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";


const VideoCall = () => {

  const location = useLocation();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation()
  const { authUser } = useAuthContext()

  useEffect(() => {
    console.log(location.state);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log(stream);
      });

    // socket.emit('calling', { receiver: selectedConversation, sender: authUser })

    return () => {
      // stream?.getTracks().forEach((track) => {
      //   console.log(track);
      //   track.stop();
      // });
    }
  }, [])


  return (
    <div>VideoCall</div>
  )
}

export default VideoCall