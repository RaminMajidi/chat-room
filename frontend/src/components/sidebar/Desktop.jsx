import React, { Suspense } from 'react'
import SearchInput from './SearchInput'
import SpinnerLoading from '../custom/SpinnerLoading'
import LogoutButton from './LogoutButton'
import Conversations from './Conversations'
import FullScreen from './FullScreen'

const Desktop = () => {
    return (
        <div className={`md:flex flex-col border-r p-4 border-slate-500  
        top-0 w-full max-w-80 relative left-0 h-full hidden `}
        >
            <SearchInput />
            <div className="divider px-3"></div>
            <Suspense fallback={<SpinnerLoading />}>
                <Conversations />
            </Suspense>
            <div className='flex gap-4'>
                <LogoutButton />
                <FullScreen />
            </div>
        </div>
    )
}

export default Desktop