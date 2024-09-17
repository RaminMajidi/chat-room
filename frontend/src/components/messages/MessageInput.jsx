import { BsSend } from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage';
import { useState } from 'react';
import DotsLoading from "../custom/DotsLoading"

const MessageInput = () => {
    const [message, setMessage] = useState('')
    const { sendMessage, loading } = useSendMessage()

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message)
        setMessage('')
    }

    return (
        <form className='px-4 mb-1 mt-2 h-12 ' onSubmit={submitHandler}>
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700
                     border-gray-600 text-white"
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    type='submit'
                    className='absolute inset-y-0 end-0 flex items-center pe-3'
                >
                    {loading ? (
                        <DotsLoading />
                    ) : (
                        <BsSend className='text-white' />
                    )}
                </button>
            </div>
        </form>
    )
}

export default MessageInput
