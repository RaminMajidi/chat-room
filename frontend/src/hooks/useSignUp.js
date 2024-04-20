import { useState } from "react"
import toast from "react-hot-toast";
import { httpService } from "../services/httpServce";
import { errorAlert } from "../utils/Alerts";
import { useAuthContext } from "../context/AuthContext";


const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()
    
    const signup = async ({ fullName, userName, password, confirmPassword, gender }) => {
        const succcess = inputErrosHandler({ fullName, userName, password, confirmPassword, gender });
        if (!succcess) return;
        setLoading(true);
        try {
            const res = await httpService.post('/api/auth/signup', {
                fullName, userName, password, confirmPassword, gender
            });

            if (res.status === 201) {
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

    return { loading, signup };
}

export default useSignUp

// error handler for signup inputs value
function inputErrosHandler({ fullName, userName, password, confirmPassword, gender }) {
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fiels !");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match !");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters !");
        return false;
    }

    return true;
}