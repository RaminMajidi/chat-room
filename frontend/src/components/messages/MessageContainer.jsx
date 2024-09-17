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
        <div className="flex flex-col  w-full h-full"> 
            {!selectedConversation ? (
                <NoChatSelected/>
            ) : (
                <>
                    <MessagesHeader userName={selectedConversation?.fullName} />
                    <Messages />
                    <MessageInput />
                </>
            )
            }
        </div>
    )
}

export default MessageContainer;


