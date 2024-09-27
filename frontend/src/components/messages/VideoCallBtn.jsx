import { MdVideoCall } from "react-icons/md";
import { useNavigate } from "react-router-dom"



const VideoCallBtn = () => {

    const navigate = useNavigate()

    const getCalling = () => {
        navigate("/calling", { state: { callSender: true } })
    }

    return (
        <MdVideoCall
            onClick={getCalling}
            title="Video Call"
            className="w-7 h-7 absolute top-[10%] right-[50%]
             text-yellow-300 cursor-pointer" />
    )
}

export default VideoCallBtn