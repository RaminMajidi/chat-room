import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessagesHeader from "./Header";
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import NoChatSelected from "./NoChatSelected";



const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        // cleanup function (unmounts component)
        return () => {
            setSelectedConversation(null)
        }
    }, [setSelectedConversation])

    return (
        <div className="relative flex flex-col justify-between w-full h-full">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <MessagesHeader />
                    <Messages />
                    <MessageInput />
                </>
            )
            }
        </div>
    )
}

export default MessageContainer;


