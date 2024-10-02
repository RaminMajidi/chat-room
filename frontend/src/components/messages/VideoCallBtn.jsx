import { MdVideoCall } from "react-icons/md";
import useCallHandlers from "../../hooks/useCallHandlers";

const VideoCallBtn = () => {
    const { senderCalling } = useCallHandlers();
    return (
        <MdVideoCall
            onClick={senderCalling}
            title="Video Call"
            className="w-7 h-7 absolute top-[10%] right-[50%]
             text-yellow-300 cursor-pointer" />
    )
}

export default VideoCallBtn