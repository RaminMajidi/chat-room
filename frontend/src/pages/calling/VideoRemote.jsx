import { Suspense } from 'react';
import Loading from './Loading';

const VideoRemote = ({ refRemoteVideo, remoteStream }) => {

    return (
        <div className='relative'>
            {!remoteStream && <Loading />}
            <Suspense fallback={<Loading />}>
                <video
                    autoPlay={true}
                    ref={refRemoteVideo}
                    className={`border-4 border-b-2 border-blue-500
                        bg-slate-950 w-full max-h[45%] rounded-t-xl`}
                ></video>
            </Suspense>
        </div>
    )
}

export default VideoRemote