import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";


const VideoCall = () => {
  const { stream, setStream,desableStream, selectedConversation } = useConversation();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream)
        console.log();
      });
    return () => {
      desableStream()
      // stream?.getTracks().forEach((track) => {
      //   console.log(track);
      //   track.stop();
      // });
    }
  }, [])



  useEffect(() => {
    console.log(selectedConversation);
    console.log(stream);
  }, [stream])

  return (
    <div>VideoCall</div>
  )
}

export default VideoCall