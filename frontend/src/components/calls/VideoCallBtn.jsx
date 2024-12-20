import { MdVideoCall } from "react-icons/md";
import useCallHandlers from "@src/hooks/useCallHandlers";

const VideoCallBtn = () => {
    const { getCalling } = useCallHandlers();
    return (
        <MdVideoCall
            onClick={getCalling}
            title="Video Call"
            className="w-7 h-7 absolute top-[10%] right-[50%]
             text-yellow-300 cursor-pointer" />
    )
}

export default VideoCallBtn