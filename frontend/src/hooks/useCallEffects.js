import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCallData from "../zustand/useCallData";
import toast from "react-hot-toast";


const useCallEffects = () => {


    const location = useLocation();
    const navigate = useNavigate();
    const refLocalVideo = useRef();
    const refRemoteVideo = useRef();
    const {
        calling, peer, setUserCaller,
        receiverUser, setReceiverUser,
        localStream, setLocalStream,
        remoteStream, setRemoteStream, } = useCallData();

    // درخواست از کاربر برای درسترسی به دوربین ومیکروفن محلی
    useEffect(() => {
        if (!location.state) {
            return navigate('/404');
        }

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
            }).catch(error => {
                toast.error("Please check the level of camera and microphone!")
            });

        // پاکسازی دسترسی به مدیا و مقادیر
        return () => {
            if (location.pathname != "calling") {
                window.history.replaceState({}, '');
                setLocalStream(null);
                setRemoteStream(null);
                myStream?.getTracks().forEach((track) => track.stop());
                refLocalVideo.current = null;
                refRemoteVideo.current = null;
                setUserCaller(null);
                setReceiverUser(null)
            }
        }
        // ***

    }, []);
    // ***


    // نمایش مدیا داخلی و هندل کردن تماس
    useEffect(() => {
        try {
            // نمایش مدیا داخلی
            if (localStream && location.state) {
                refLocalVideo.current.srcObject = localStream;
                refLocalVideo.current.onloadedmetadata = async () => {
                    await refLocalVideo.current.play();
                }
            }
            // ***

            // پاسخ به تماس دریافتی و ارسال و دریافت مدیا
            if (localStream && location.state.callReceiver && !calling) {
                peer.on("call", call => {
                    call.answer(localStream);
                    call.on('stream', async (rStream) => {
                        await setRemoteStream(rStream)
                    });
                });
            }
            // ***

            // ارسال تماس و دریافت مدیا خارجی
            if (localStream && location.state.callSender && !calling) {
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
            // ***

        } catch (error) {
            console.log(error);
        }
    }, [localStream, calling]);
    // ***


    // نمایش مدیا خارجی
    useEffect(() => {
        if (remoteStream && !calling) {
            refRemoteVideo.current.srcObject = remoteStream;
            refRemoteVideo.current.onloadedmetadata = () => {
                refRemoteVideo.current.play();
            }
        }
    }, [remoteStream, calling]);
    // ***

    return {
        localStream,
        remoteStream,
        refLocalVideo,
        refRemoteVideo,
    };
}

export default useCallEffects;