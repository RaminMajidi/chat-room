import useConversation from "@src/zustand/useConversation";
import VideoCallBtn from "@components/calls/VideoCallBtn";

const MessagesHeader = () => {
    const { selectedConversation } = useConversation();
    return (
        <div className="bg-slate-700 px-4 py-2 mb-2  max-h-max 
        sticky top-0 w-full z-40">
            <span className="label-text text-white">TO :</span>{" "}
            <span className="text-gray-100 font-bold">
                {selectedConversation?.fullName}
            </span>
            <VideoCallBtn />
        </div>
    )
}

export default MessagesHeader