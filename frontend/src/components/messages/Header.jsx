

const MessagesHeader = ({ userName }) => {
    return (
        <div className="bg-slate-700 px-4 py-2 mb-2 h-[8%] max-h-max 
        sticky top-0 w-full z-40">
            <span className="label-text text-white">TO :</span>{" "}
            <span className="text-gray-100 font-bold">
                {userName}
            </span>
        </div>
    )
}

export default MessagesHeader