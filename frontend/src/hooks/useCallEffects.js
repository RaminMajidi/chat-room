import { useEffect, useRef, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useLocation, useNavigate } from "react-router-dom";
import useCallData from "../zustand/useCallData";


const useCallEffects = () => {

    const { socket } = useSocketContext();
    const location = useLocation();
    const navigate = useNavigate();
    const refLocalVideo = useRef();
    const refRemoteVideo = useRef();
    const { calling, setCalling, peer, localStream,
        setLocalStream, remoteStream, setRemoteStream,
        receiverUser } = useCallData();

    useEffect(() => {
        if (!location.state) {
            return navigate('/404');
        }
        return () => window.history.replaceState({}, '');
    }, [location]);

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
        try {
            if (localStream) {
                refLocalVideo.current.srcObject = localStream;
                refLocalVideo.current.onloadedmetadata = async () => {
                    await refRemoteVideo.current.play();
                }
            }


            if (localStream && location.state.callReceiver) {
                peer.on("call", call => {
                    call.answer(localStream);
                    call.on('stream', async (rStream) => {
                        await setRemoteStream(rStream)
                    });
                });
            }


            if (localStream && location.state.callSender) {
                const call = peer.call(receiverUser?._id, localStream);
                call.on('stream', async (rStream) => {
                    if (await rStream) {
                        refRemoteVideo.current.srcObject = rStream;
                        refRemoteVideo.current.onloadedmetadata = async () => {
                            await refRemoteVideo.current.play();
                        }
                        setRemoteStream(rStream);
                    }
                });
            }

        } catch (error) {
            console.log(error);
        }
    }, [localStream, calling]);


    useEffect(() => {
        if (remoteStream) {
            refRemoteVideo.current.srcObject = remoteStream;
            refRemoteVideo.current.onloadedmetadata = async () => {
                await refRemoteVideo.current.play();
            }
        }
    }, [remoteStream])

    return { localStream, refLocalVideo, refRemoteVideo };
}

export default useCallEffects;