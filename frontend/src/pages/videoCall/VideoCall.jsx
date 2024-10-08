import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "@src/context/SocketContext";
import useConversation from "@src/zustand/useConversation";
import { useAuthContext } from "@src/context/AuthContext";
import { useLocation } from "react-router-dom";
import Peer from 'peerjs';
import { CiMicrophoneOn } from "react-icons/ci";
import { CiMicrophoneOff } from "react-icons/ci";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { FaPhoneSlash } from "react-icons/fa";






const VideoCall = () => {

  const location = useLocation();
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation()
  const { authUser } = useAuthContext()


  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let getUserMedia;
    console.log(location.state);
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id)
    });

    peer.on('call', (call) => {
      getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream)
        call.on('stream', function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    });

    peerInstance.current = peer;

    return () => {
      getUserMedia?.getTracks().forEach((track) => {
        console.log(track);
        track.stop();
      });
    }
  }, [peerInstance])



  useEffect(() => {
    if (!location.state?.sender && peerId) {
      socket?.emit('callWasMade', {
        peerId,
        senderId: location.state.senderId
      });
      setLoading(false);
    }
  }, [peerId])


  useEffect(() => {
    socket.on('callWasMade', id => {
      console.log(id);
      setRemotePeerIdValue(id);
      call(id);
    })
  }, [socket])




  const call = (remotePeerId) => {
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {

      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream)

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    });

    setLoading(false);
  }


  return (

    <>
      {
        loading ? (
          <span className="loading loading-spinner loading-lg" ></span>
        ) : (
          <section className=" w-[300px] h-[500px] rounded-xl">
            <video width="100%"
              poster="data:image/jpeg;base64,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"
              ref={remoteVideoRef}
              className="w-full aspect-auto rounded-t-xl border"
            ></video>

            <video
              width="100%"
              ref={currentUserVideoRef}
              className="w-full aspect-auto"
            ></video>

            <div className="w-full h-[10%] bg-slate-700 flex gap-3 justify-evenly items-center rounded-b-xl">
              <FaPhoneSlash
                size={32}
                className="bg-blue-500 text-white w-10 h-10 rounded-full p-2 cursor-pointer" />
              <CiMicrophoneOn
                size={32}
                className="bg-blue-500 text-white w-10 h-10 rounded-full p-2 cursor-pointer" />
              <HiOutlineVideoCamera
                size={32}
                className="bg-blue-500 text-white w-10 h-10 rounded-full p-2 cursor-pointer" />
            </div>
          </section >
        )
      }
    </>



  )
}

export default VideoCall





// <div >
//     <h1>Current user id is {peerId}</h1>
//     <input type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
//     <button onClick={() => call(remotePeerIdValue)}>Call</button>
//     <div>
//       <video ref={currentUserVideoRef} />
//     </div>
//     <div>
//       <video ref={remoteVideoRef} />
//     </div>
//   </div >