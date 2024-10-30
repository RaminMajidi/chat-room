import useCallHandlers from "../../hooks/useCallHandlers";
import { FaPhoneSlash } from "react-icons/fa";

const EndCallBtn = () => {

    const { callEnd } = useCallHandlers();

    return (
        <div className="absolute top-2 right-2">
            <FaPhoneSlash
                title="Call End"
                onClick={callEnd}
                size={32}
                className="bg-red-500 text-white w-10 h-10 
                rounded-full p-2 cursor-pointer hover:bg-red-700 
                transition-all duration-200" />
        </div>
    )
}

export default EndCallBtn