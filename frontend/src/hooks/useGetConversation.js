import { useEffect, useState } from "react"
import { httpInterceptedService } from "../services/httpServce";
import { errorAlert } from "../utils/Alerts"


const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversatios] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await httpInterceptedService.get('/api/users/sidebar');
                if (res.status === 200) {
                    const data = await res.data;
                    setConversatios(data)
                }

            } catch (error) {
                errorAlert(error)
            } finally {
                setLoading(false)
            }
        }
        getConversations();
    }, [])
    return { loading, conversations }
}

export default useGetConversation