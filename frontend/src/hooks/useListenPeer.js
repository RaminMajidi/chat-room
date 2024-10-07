import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";


const useListenPeer = () => {

    const { socket } = useSocketContext();


    const [peerId, setPeerId] = useState('');
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const remoteVideoRef = useRef(null);
    const currentUserVideoRef = useRef(null);
    const peerInstance = useRef(null);


    const callPeerHandler = (remotePeerId) => {

    }

    useEffect(() => {

    }, [])



}

export default useListenPeer;