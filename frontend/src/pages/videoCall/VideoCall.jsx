import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";


const VideoCall = () => {

  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation()
  const { authUser } = useAuthContext()

  useEffect(() => {
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