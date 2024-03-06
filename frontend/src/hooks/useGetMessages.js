import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import { errorAlert } from '../utils/Alerts';
import { httpInterceptedService } from '../services/httpServce';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await httpInterceptedService.get(
                    `/api/messages/${selectedConversation._id}`
                );

                if (res.status === 200) {
                    const data = await res.data
                    setMessages(data)
                }

            } catch (error) {
                errorAlert(error)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages])

    return { messages, loading }
}

export default useGetMessages