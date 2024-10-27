import Loading from './Loading';

const VideoLocal = ({ refLocalVideo, localStream }) => {
   
    return (
        <div className='relative'>
            {!localStream && <Loading />}
            <video
                autoPlay={true}
                muted={true}
                ref={refLocalVideo}
                className={`border-4 border-y-2 border-blue-500
                    bg-slate-950 w-full max-h[45%]`}
            ></video>
        </div>
    )
}

export default VideoLocal