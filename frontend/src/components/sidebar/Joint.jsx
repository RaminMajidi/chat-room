import { Suspense } from "react"
import SpinnerLoading from "../custom/SpinnerLoading"
import Conversations from "./Conversations"
import SearchInput from "./SearchInput"
import LogoutButton from "./LogoutButton"
// import FullScreen from "./FullScreen"


const Joint = () => {
    return (
        <div>
            <SearchInput />
            <div className="divider px-3"></div>
            <Suspense fallback={<SpinnerLoading />}>
                <Conversations />
            </Suspense>
            <div className='absolute bottom-8 left-8 z-10'>
                <LogoutButton />
                {/* <FullScreen /> */}
            </div>
        </div>
    )
}

export default Joint