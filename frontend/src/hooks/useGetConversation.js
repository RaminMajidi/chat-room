import { useEffect, useState } from "react"
import { httpInterceptedService } from "../services/httpServce";
import { errorAlert } from "../utils/Alerts"
import { useSocketContext } from "../context/SocketContext";


const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversatios] = useState([]);
    const { socket } = useSocketContext();

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

    useEffect(() => {
        socket?.on('newUser', (newUser) => {
            setConversatios(prev=> [...prev,newUser])
        });
        return () => socket?.off('newUser');
    }, [socket])


    return { loading, conversations }
}

export default useGetConversation