import Loading from './Loading';

const VideoLocal = ({ refLocalVideo, localStream }) => {
   
    return (
        <div className='absolute top-0 right-0 border-4 border-t-0 border-r-0
        border-slate-950 rounded-bl-md'>
            {!localStream && <Loading />}
            <video
                autoPlay={true}
                muted={true}
                ref={refLocalVideo}
                className={`bg-slate-950  w-[25vw] aspect-auto`}
            ></video>
        </div>
    )
}

export default VideoLocal