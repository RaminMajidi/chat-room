import Loading from './Loading';

const VideoLocal = ({ refLocalVideo, localStream }) => {
   
    return (
        <>
            {!localStream && <Loading />}
            <video
                autoPlay={true}
                muted={true}
                ref={refLocalVideo}
                className={`w-full `}
            ></video>
        </>
    )
}

export default VideoLocal