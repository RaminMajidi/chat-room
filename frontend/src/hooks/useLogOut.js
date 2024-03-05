import { useState } from "react"
import { httpService } from "../services/httpServce";
import { errorAlert } from "../utils/Alerts";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogOut = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const logOut = async () => {
        setLoading(true)
        try {
            const res = await httpService.post('/api/auth/logout');

            if (res.status === 200) {
                localStorage.removeItem('chat-user');
                setAuthUser(null);
                toast.success(res?.data?.message || "Logged Out Successfully")
            }
        } catch (error) {
            errorAlert(error)
        } finally {
            setLoading(false)
        }

    }
    return { loading, logOut }
}

export default useLogOut;