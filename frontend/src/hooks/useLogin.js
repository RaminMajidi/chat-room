import { useState } from "react"
import toast from "react-hot-toast";
import { httpService } from "../services/httpServce";
import { errorAlert } from "../utils/Alerts";
import { useAuthContext } from "../context/AuthContext";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()



    const login = async ({ userName, password }) => {
        const succcess = inputErrosHandler({ userName, password });
        if (!succcess) return;
        setLoading(true);
        try {
            const res = await httpService.post('/api/auth/login', {
                userName, password
            });

            if (res.status === 200) {
                const data = await res.data;
                localStorage.setItem('chat-user', JSON.stringify(data))
                setAuthUser(data)
            }
        } catch (error) {
            errorAlert(error);
        } finally {
            setLoading(false)
        }
    }

    return { loading, login };
}

export default useLogin

// error handler for login inputs value
function inputErrosHandler({ userName, password }) {
    if (!userName || !password) {
        toast.error("Please fill in all fiels !");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters !");
        return false;
    }

    return true;
}