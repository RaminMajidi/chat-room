import { Suspense } from 'react';
import Loading from './Loading';

const VideoRemote = ({ refRemoteVideo, remoteStream }) => {

    return (
        <>
            {!remoteStream && <Loading />}
            <Suspense fallback={<Loading />}>
                <video
                    autoPlay={true}
                    ref={refRemoteVideo}
                    className={`w-full rounded-t-xl`}
                ></video>
            </Suspense>
        </>
    )
}

export default VideoRemote