import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation'

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const formattedTime = extractTime(message.createdAt);
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
    const shakeClass = message.shouldShake ? 'shake' : '';


    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt={`No-Image`}
                        src={profilePic} 
                        onError={(e)=>e.target.src = "./public/user.png"}
                        />
                </div>
            </div>
            <div className={`chat-bubble text-wrap text-white pb-2 ${bubbleBgColor} ${shakeClass}`}>
            {message.message}
            </div>
            <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center text-white`}>
                {formattedTime}
            </div>
        </div>
    )
}

export default Message