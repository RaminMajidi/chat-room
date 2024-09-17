import React, { useEffect, useState } from 'react'

const Modal = () => {
    const [screen, SetScreen] = useState(false)

    useEffect(() => {
        document.getElementById('my_modal_3').showModal();
    }, [])

    const handlerFullScreen = () => {
        if (!document.fullscreenElement) {
            SetScreen(true)
            document.documentElement.requestFullscreen();
        }
    }

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button> */}
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                        Please set your device to full screen for a better experience
                    </p>
                    <button className="">
                        <span
                            onClick={handlerFullScreen}
                            className='btn'>
                            OK
                        </span>
                    </button>
                </form>
            </div>
        </dialog>
    )
}

export default Modal