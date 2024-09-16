

const MessagesHeader = ({ userName }) => {
    return (
        <div className="bg-slate-700 px-4 py-2 mb-2">
            <span className="label-text text-white">TO :</span>{" "}
            <span className="text-gray-100 font-bold">
                {userName}
            </span>
        </div>
    )
}

export default MessagesHeader