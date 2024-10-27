
const Loading = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center 
        items-center text-white absolute top-0 right-0'>
            <span className="loading loading-spinner loading-lg"></span>
            <h3>Loading...</h3>
        </div>
    )
}

export default Loading