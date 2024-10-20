import { useLocation, useNavigate } from 'react-router-dom'
import { Suspense, useEffect, useRef, useState } from "react"
import CallReceiverModal from '@components/calls/CallReceiverModal';
import CallSenderModal from '@components/calls/CallSenderModal';
import useCallData from '@src/zustand/useCallData';
import useCallEffects from '../../hooks/useCallEffects';
import { FaPhoneSlash } from "react-icons/fa";
import { CiMicrophoneOn } from "react-icons/ci";
import { HiOutlineVideoCamera } from "react-icons/hi";



const Calling = () => {

    const location = useLocation();

    const { calling } = useCallData();


    const { refLocalVideo, refRemoteVideo, remoteStream } = useCallEffects();

    return (<>
        {(location.state?.callReceiver && calling) && <CallReceiverModal />}
        {(location.state?.callSender && calling) && <CallSenderModal />}
        <section className="w-full max-w-[450px]  flex flex-col justify-around px-2">
            {!remoteStream && <h3>Loading...</h3>

            }

            <video
                onLoad={(e) => { console.log(e) }}
                onError={(e) => console.log(e)}
                autoPlay={true}
                ref={refRemoteVideo}
                className={`w-full rounded-t-xl`}
            ></video>

            <video
                onLoad={(e) => { console.log(e) }}
                onError={(e) => console.log(e)}
                autoPlay={true}
                muted={true}
                ref={refLocalVideo}
                className={`w-full  border-red-500`}
            ></video>

            <div className="w-full bg-slate-700 flex p-2 
        justify-center gap-x-10 items-center rounded-b-xl">
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


    </>);
}

export default Calling