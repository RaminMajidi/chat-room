import React, { Suspense } from 'react'
import SearchInput from './SearchInput'
import SpinnerLoading from '../custom/SpinnerLoading'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import {IoMdMenu} from "react-icons/io"

const Drawer = () => {
    return (
        <div className="drawer drawer-end md:hidden z-20">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                
                <label
                    htmlFor="my-drawer-4"
                    className="absolute right-0">
                   <IoMdMenu className='w-12 h-12 mr-2 text-white'/>
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"></label>
                <ul className="menu bg-gray-950 text-base-content min-h-full w-80 px-6 py-16">
                    <SearchInput />
                    <div className="divider px-3"></div>
                    <Suspense fallback={<SpinnerLoading />}>
                        <Conversations />
                    </Suspense>
                    <LogoutButton />
                </ul>
            </div>
        </div>
    )
}

export default Drawer