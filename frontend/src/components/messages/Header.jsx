

const MessagesHeader = ({ userName }) => {
    return (
        <div className="bg-slate-600 px-4 py-2 mb-2">
            <span className="label-text">TO :</span>{" "}
            <span className="text-gray-950 font-bold">
                {userName}
            </span>
        </div>
    )
}

export default MessagesHeader