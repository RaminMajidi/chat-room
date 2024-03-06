import { useEffect, useRef } from 'react';
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../custom/MessageSkeleton';
import Message from './Message'

const Messages = () => {

    const { messages, loading } = useGetMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 150)
    }, [messages])

    return (
        <div className='px-4 flex-1 overflow-auto'>

            {loading && [...Array(3)].map((_, i) => <MessageSkeleton key={i} />)}

            {!loading && messages.length > 0 && (
                messages.map(message => (
                    <div key={message.createdAt} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))
            )}

            {!loading && messages.length === 0 && (
                <p className='text-center mt-1'>Send a message to start the conversation</p>
            )}

        </div>
    )
}

export default Messages