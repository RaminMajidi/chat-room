import { BiLogOut } from "react-icons/bi"
import useLogOut from "../../hooks/useLogOut"
import SpinnerLoading from "../custom/SpinnerLoading"

const LogoutButton = () => {
    const { loading, logOut } = useLogOut()
    return (
        <div className="mt-4">
            {
                !loading ? (
                    <BiLogOut
                        title="Log Out"
                        onClick={logOut}
                        className="w-6 h-6 text-white cursor-pointer "
                    />
                ) : (
                    <SpinnerLoading />
                )
            }
        </div>
    )
}

export default LogoutButton