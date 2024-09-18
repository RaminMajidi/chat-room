import { Suspense } from "react"
import SpinnerLoading from "../custom/SpinnerLoading"
import Conversations from "./Conversations"
import SearchInput from "./SearchInput"
import LogoutButton from "./LogoutButton"
// import FullScreen from "./FullScreen"


const Joint = () => {
    return (
        <>
            <SearchInput />
            <div className="divider px-3"></div>
            <Suspense fallback={<SpinnerLoading />}>
                <Conversations />
            </Suspense>
            <div className='flex gap-4'>
                <LogoutButton />
                {/* <FullScreen /> */}
            </div>
        </>
    )
}

export default Joint