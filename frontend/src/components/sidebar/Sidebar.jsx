import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import { Suspense } from 'react'
import SpinnerLoading from '../custom/SpinnerLoading'

const Sidebar = () => {
    return (
        <div className='border-r h-[35dvh] sm:h-[100%] border-slate-500 p-4 flex flex-col'>
            <SearchInput />
            <div className="divider px-3"></div>
            <Suspense fallback={<SpinnerLoading />}>
                <Conversations />
            </Suspense>
            <LogoutButton />
        </div>
    )
}

export default Sidebar