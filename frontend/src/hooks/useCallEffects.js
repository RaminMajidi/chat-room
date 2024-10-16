import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useLocation, useNavigate } from "react-router-dom";


const useCallEffects = () => {

    const { socket } = useSocketContext();
    const [localStream, setLocalStream] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const refLocalVideo = useRef();
    const refRemoteVideo = useRef();


    useEffect(() => {
        if (!location.state) {
            return navigate('/404');
        }
        return () => window.history.replaceState({}, '');
    }, [location])





    useEffect(() => {
        const constraints = {
            audio: true,
            video: {
                width: { min: 1024, ideal: 1280, max: 1920 },
                height: { min: 576, ideal: 720, max: 1080 },
            },
        };

        let myStream;

        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                setLocalStream(stream);
                myStream = stream;
            }).catch(error => { console.log(error); });


        return () => myStream?.getTracks().forEach((track) => track.stop());

    }, [])


    useEffect(() => {
        if (localStream) {
            refLocalVideo.current.srcObject = localStream;
            refLocalVideo.current.play();
        }
    }, [localStream])

    return { localStream, refLocalVideo, refRemoteVideo };
}

export default useCallEffects;