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
                    className={`bg-slate-950 w-full max-h-[96dvh] aspect-auto`}
                ></video>
            </Suspense>
        </div>
    )
}

export default VideoRemote