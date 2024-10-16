import { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext';
import Peer from 'peerjs';
import useCallData from '../zustand/useCallData';

const usePeerConection = () => {

    const { peer, setPeer } = useCallData();
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const id = authUser._id;
            const newPeer = new Peer(id);
            setPeer(newPeer);
        } else if (!authUser && peer) {
            peer.distroy();
            setPeer(null);
        }
    }, [authUser]);
}

export default usePeerConection