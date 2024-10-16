import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from "react"
import CallReceiverModal from '@components/calls/CallReceiverModal';
import CallSenderModal from '@components/calls/CallSenderModal';
import useCallData from '@src/zustand/useCallData';
import useCallEffects from '../../hooks/useCallEffects';

const Calling = () => {

    const location = useLocation();

    const { peer, callId } = useCallData();


    const { refLocalVideo, refRemoteVideo } = useCallEffects();

    return (<>
        {(location.state?.callReceiver && !callId) && <CallReceiverModal />}
        {(location.state?.callSender && !callId) && <CallSenderModal />}

        <section className=" w-60 rounded-xl">
            <video width="100%"
                autoPlay={true}
                ref={refRemoteVideo}
                className=" aspect-auto rounded-t-xl border"
            ></video>

            <video
                autoPlay={true}
                muted={true}
                width="100%"
                ref={refLocalVideo}
                className=" aspect-auto"
            ></video>

            {/* <div className="w-full h-[10%] bg-slate-700 flex gap-3 justify-evenly items-center rounded-b-xl">
                <FaPhoneSlash
                    size={32}
                    className="bg-blue-500 text-white w-10 h-10 rounded-full p-2 cursor-pointer" />
                <CiMicrophoneOn
                    size={32}
                    className="bg-blue-500 text-white w-10 h-10 rounded-full p-2 cursor-pointer" />
                <HiOutlineVideoCamera
                    size={32}
                    className="bg-blue-500 text-white w-10 h-10 rounded-full p-2 cursor-pointer" />
            </div> */}
        </section >


    </>);
}

export default Calling