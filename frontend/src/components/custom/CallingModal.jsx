import React from 'react'
import useCallData from '../../zustand/useCallData';

const CallingModal = () => {
    const { calling, setCalling, userCaller, setUserCaller } = useCallData();
    return (
        <section className='absolute bg-black w-full h-full z-[1000]
        backdrop-filter backdrop-blur-lg bg-opacity-60 p-4 flex 
        justify-center items-center'>

            <article className='w-full h-full max-w-80 p-2 rounded-2xl
            max-h-80 border flex flex-col justify-start items-center
            gap-3'>
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img
                            onError={(e) => e.target.src = "./public/user.png"}
                            src="" />
                    </div>
                </div>

                <h3 className='font-bold'>Receiving a call from</h3>
                <h5 className='font-bold'>user test</h5>
            </article>

        </section>
    )
}

export default CallingModal;