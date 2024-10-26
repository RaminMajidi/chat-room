import useCallHandlers from "../../hooks/useCallHandlers";
import { FaPhoneSlash } from "react-icons/fa";

const EndCallBtn = () => {

    const { callEnd } = useCallHandlers();

    return (
        <div className="w-full bg-slate-700 flex p-2 
        justify-center gap-x-10 items-center rounded-b-xl">
            <FaPhoneSlash
                title="Call End"
                onClick={callEnd}
                size={32}
                className="bg-red-500 text-white w-10 h-10 
                rounded-full p-2 cursor-pointer hover:bg-red-700 transition-all duration-200" />
        </div>
    )
}

export default EndCallBtn