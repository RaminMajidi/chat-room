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

      getUserMedia({ video: true, audio: true }, async (mediaStream) => {
        if (await mediaStream) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
        }

        call.on('stream', (remoteStream) => {
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

    getUserMedia({ video: true, audio: true }, async (mediaStream) => {
      if (await mediaStream) {
        currentUserVideoRef.current.srcObject = await mediaStream;
        currentUserVideoRef.current.play();
      }

      const call = await peerInstance.current.call(remotePeerId, mediaStream)

      call.on('stream', async (remoteStream) => {
        if (await remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        }
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
              ref={remoteVideoRef}
              className="w-full aspect-auto rounded-t-xl border"
            ></video>

            <video
              muted={true}
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