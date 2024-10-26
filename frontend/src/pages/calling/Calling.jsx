import { useLocation } from 'react-router-dom'
import CallReceiverModal from '@components/calls/CallReceiverModal';
import CallSenderModal from '@components/calls/CallSenderModal';
import useCallData from '@src/zustand/useCallData';
import VideoRemote from './VideoRemote';
import VideoLocal from './VideoLocal';
import EndCallBtn from './EndCallBtn';
import CallBox from './CallBox';
import useCallEffects from '../../hooks/useCallEffects';



const Calling = () => {

    const location = useLocation();
    const { calling } = useCallData();

    const { refLocalVideo, localStream, refRemoteVideo, remoteStream } = useCallEffects();


    return (<>
        {(location.state?.callReceiver && calling) && <CallReceiverModal />}
        {(location.state?.callSender && calling) && <CallSenderModal />}
        <CallBox>
            <VideoRemote
                refRemoteVideo={refRemoteVideo}
                remoteStream={remoteStream}
            />
            <VideoLocal
                localStream={localStream}
                refLocalVideo={refLocalVideo}
            />
            <EndCallBtn />
        </CallBox>
    </>);
}

export default Calling