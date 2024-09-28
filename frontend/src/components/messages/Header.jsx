import useConversation from "../../zustand/useConversation";
import VideoCallBtn from "./VideoCallBtn";

const MessagesHeader = () => {

    const { selectedConversation } = useConversation();

    return (
        <div className="bg-slate-700 px-4 py-2 mb-2  max-h-max 
        sticky top-0 w-full z-40">
            <span className="label-text text-white">TO :</span>{" "}
            <span className="text-gray-100 font-bold">
                {selectedConversation?.fullName}
            </span>
            <VideoCallBtn
                _id={selectedConversation?._id}
                fullName={selectedConversation?.fullName}
                profilePic={selectedConversation.profilePic}
            />
        </div>
    )
}

export default MessagesHeader