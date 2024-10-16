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
  // const { peer } = usePeerContext()


  const [peerId, setPeerId] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const [loading, setLoading] = useState(true);
  const [agin, setAgin] = useState(0)

  useEffect(() => {
   

    console.log(location.state);
    const id = authUser._id;
    const peer = new Peer(id);
    setPeerId(id);

    const constraints = {
      audio: true,
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
      },
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        // setLoading(false);
        setLocalStream(stream);
        currentUserVideoRef.current.srcObject = stream;
        currentUserVideoRef.current.play();
        currentUserVideoRef.current.onloadedmetadata = () => {
          currentUserVideoRef.current.play();
        }

        peer.on("call", call => {
          call.answer(stream);

          call.on('stream', async (remoteStream) => {

            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
            remoteVideoRef.current.onloadedmetadata = () => {
              remoteVideoRef.current.play();
            }

          });
        })
      }).catch(err => {
        console.log(err);
        setAgin(c => c + 1)
        setLoading(false);
      })
    setLoading(false)
    peerInstance.current = peer;

    // return () => {
    //   getUserMedia?.getTracks().forEach((track) => {
    //     console.log(track);
    //     track.stop();
    //   });
    // }
  }, [agin,peerInstance])



  useEffect(() => {
    if (!location.state?.sender && peerId) {
      console.log("peerId", peerId);
      socket?.emit('callWasMade', {
        peerId,
        senderId: location.state.senderId
      });
      setLoading(false);
    }
  }, [peerId])


  useEffect(() => {
    socket?.on('callWasMade', id => {
      console.log("remoteId: ", id);
      setRemotePeerIdValue(id);
      call(id);
    })
  }, [socket])




  const call = (remotePeerId) => {

    const constraints = {
      audio: true,
      video: {
        width: { min: 1024, ideal: 1280, max: 1920 },
        height: { min: 576, ideal: 720, max: 1080 },
      },
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        currentUserVideoRef.current.srcObject = stream;
        currentUserVideoRef.current.play();
        currentUserVideoRef.current.onloadedmetadata = () => {
          currentUserVideoRef.current.play();
        }

        const call = peerInstance.current.call(remotePeerId, stream);
        call.on('stream', (remoteStream) => {

          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
          remoteVideoRef.current.onloadedmetadata = () => {
            remoteVideoRef.current.play();
          }
        });
        setLoading(false);

      }).catch(err => {
        console.log(err);
        setLoading(false);
      })
  }


  return (

    <>
      {
        loading ? (
          <span className="loading loading-spinner loading-lg" ></span>
        ) : (
          <section className=" w-[300px] h-[500px] rounded-xl">
            <video width="100%"
              autoPlay={true}
              ref={remoteVideoRef}
              className="w-full aspect-auto rounded-t-xl border"
            ></video>

            <video
              autoPlay={true}
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