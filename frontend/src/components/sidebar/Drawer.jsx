import { IoMdMenu } from "react-icons/io"
import { IoMdClose } from "react-icons/io"
import Joint from './Joint'
import { useRef, useState } from "react"

const Drawer = () => {
    const [showModal, setShowModal] = useState(false);
    const refCheck = useRef();

    const handlerShowModal = () => {
        console.log(refCheck.current.checked);
    }


    return (
        <div className="drawer drawer-end md:hidden z-50">
            <input
                onChange={() => setShowModal(refCheck.current.checked)}
                ref={refCheck}
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
            />
            <div className="drawer-content">
                {/* Page content here */}

                <label
                    htmlFor="my-drawer-4"
                    className={` z-40 cursor-pointer `}>
                    {showModal ? (
                        <IoMdClose
                            onClick={() => setShowModal(false)}
                            className={`w-12 h-12 text-red-500 fixed top-2 right-64 z-50`}
                        />
                    ) : (
                        <IoMdMenu
                            onClick={() => setShowModal(true)}
                            className='w-12 h-12 text-white fixed top-0 right-1 '
                        />
                    )
                    }
                </label>
            </div>
            <div className="drawer-side max-h-[90dvh] fixed top-0 right-0">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"></label>
                <ul className="menu bg-gray-950 text-base-content h-full
                 w-80 px-6 py-16 ">
                    <Joint />
                </ul>
            </div>
        </div>
    )
}

export default Drawer