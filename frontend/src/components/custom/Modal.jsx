import React from 'react'

const Modal = () => {


    const handlerFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }


    return (
        <>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                        Please set the device to full screen mode for a better experience
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                onPointerDown={handlerFullScreen}
                                className="btn mx-1">ok</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Modal