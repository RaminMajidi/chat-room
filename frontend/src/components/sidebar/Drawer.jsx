import { IoMdMenu } from "react-icons/io"
import { IoMdClose } from "react-icons/io"
import Joint from './Joint'
import { useState } from "react"

const Drawer = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="drawer drawer-end md:hidden z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}

                <label
                    htmlFor="my-drawer-4"
                    className="fixed right-1 top-1 z-40">
                    {showModal ? (
                        <IoMdClose
                            onClick={() => setShowModal(v => !v)}
                            className='w-12 h-12 mr-2 text-white'
                        />
                    ) : (
                        <IoMdMenu
                            onClick={() => setShowModal(v => !v)}
                            className='w-12 h-12 mr-2 text-white'
                        />
                    )
                    }
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"></label>
                <ul className="menu bg-gray-950 text-base-content  min-h-full w-80 px-6 py-16">
                    <Joint />
                </ul>
            </div>
        </div>
    )
}

export default Drawer