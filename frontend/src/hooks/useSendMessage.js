import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import { errorAlert } from "../utils/Alerts"
import { httpInterceptedService } from "../services/httpServce"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await httpInterceptedService.post(
                `/api/messages/send/${selectedConversation._id}`,
                { message });

            if (res.status === 201) {
                const newMessage = await res.data
                setMessages([...messages, newMessage])
            }

        } catch (error) {
            errorAlert(error);
        } finally {
            setLoading(false)
        }
    }

    return { sendMessage, loading }
}

export default useSendMessage