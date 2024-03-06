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
        <div className="md:min-w-[450px] flex flex-col">
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


