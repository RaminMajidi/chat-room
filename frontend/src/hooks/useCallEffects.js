import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useLocation, useNavigate } from "react-router-dom";
import useCallData from "../zustand/useCallData";



const useCallEffects = () => {

    const { socket } = useSocketContext();
    const location = useLocation();
    const navigate = useNavigate();
    const refLocalVideo = useRef();
    const refRemoteVideo = useRef();
    const { calling, setCalling, peer, localStream, setLocalStream, remoteStream, setRemoteStream, receiverUser } = useCallData();
    const [deviceWidth, setDeviceWidth] = useState(0)
    const [deviceHeight, setDeviceHeight] = useState(0)

    useLayoutEffect(() => {
        setDeviceWidth(window.innerWidth);
        setDeviceHeight(window.innerHeight);
    });

    useEffect(() => {
        window.addEventListener('resize', () => {
            setDeviceWidth(window.innerWidth);
            setDeviceHeight(window.innerHeight);
        });
        return () => window.removeEventListener("resize", () => {
            setDeviceWidth(window.innerWidth);
            setDeviceHeight(window.innerHeight);
        })
    }, [])



    // چک کردن مقادیر ورودی از لوکیشن وهندل کردن خطا    
    useEffect(() => {
        if (!location.state) {
            return navigate('/404');
        }
        return () => window.history.replaceState({}, '');
    }, [location]);
    // ***

    // درخواست از کاربر برای درسترسی به دوربین ومیکروفن محلی
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


        // پاکسازی دسترسی به مدیا و مقادیر
        return () => {
            if (location.pathname != "calling") {
                myStream?.getTracks().forEach((track) => track.stop());
                setLocalStream(null);
                setRemoteStream(null);
            }
        }
        // ***

    }, [location]);
    // ***


    // نمایش مدیا داخلی و هندل کردن تماس
    useEffect(() => {
        try {
            // نمایش مدیا داخلی
            if (localStream) {
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
        deviceWidth,
        deviceHeight
    };
}

export default useCallEffects;