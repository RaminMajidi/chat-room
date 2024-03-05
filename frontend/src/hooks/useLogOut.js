import { useState } from "react"
import { httpService } from "../services/httpServce";
import { errorAlert } from "../utils/Alerts";
import { useAuthContext } from "../context/AuthContext";

const useLogOut = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const logOut = async () => {
        setLoading(true)
        try {
            const res = await httpService.post('/api/auth/logout');
            console.log(res);
            if (res.status === 200) {
                localStorage.removeItem('chat-user');
                setAuthUser(null);
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