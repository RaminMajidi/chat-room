import React from 'react'
import useCallData from '@src/zustand/useCallData';
import useCallHandlers from '@src/hooks/useCallHandlers';
import sendCallingSound from "@src/assets/sounds/Phone-Ringing.mp3"

const CallSenderModal = () => {
    const { receiverUser } = useCallData();
    const { cancelOutgoingCall } = useCallHandlers()

    return (

        <section className='absolute bg-black w-full h-full z-[1000]
             backdrop-filter backdrop-blur-lg bg-opacity-60 p-4 flex 
             justify-center items-center'>
            <article className='w-full h-full max-w-80 p-2 rounded-2xl
                 max-h-80 border flex flex-col justify-evenly items-center
                 gap-3'>
                <div className="avatar mt-2">
                    <div className="w-12 rounded-full">
                        <img
                            onError={(e) => e.target.src = "./public/user.png"}
                            src={receiverUser?.profilePic} />
                    </div>
                </div>

                <div>
                    <h3 className='font-bold text-center mt-3 flex gap-2 
                     justify-center items-center'>
                        Calling...
                        <span className="loading loading-bars loading-xs"></span>
                    </h3>
                    <h5 className='font-bold text-center mt-3'>
                        {receiverUser?.fullName}
                    </h5>
                </div>

                <div className='w-full px-2 flex justify-evenly gap-2 mt-4'>

                    <button className="btn btn-active btn-error"
                        onClick={cancelOutgoingCall}
                    >
                        Cancel
                    </button>
                </div>
            </article>
            <audio
                className='hidden'
                autoPlay={true}
                loop={true}
                src={sendCallingSound}
            ></audio>
        </section>

    )
}

export default CallSenderModal;