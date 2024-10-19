import { create } from 'zustand'

const useCallData = create((set) => ({
    calling: false,
    setCalling: (calling) => set({ calling }),
    userCaller: null,
    setUserCaller: (userCaller) => set({ userCaller }),
    receiverUser: null,
    setReceiverUser: (receiverUser) => set({ receiverUser }),
    callId: null,
    setCallId: (callId) => set({ callId }),
    peer: null,
    setPeer: (peer) => set({ peer }),
    localStream: null,
    setLocalStream: (localStream) => set({ localStream }),
    remoteStream: null,
    setRemoteStream: (remoteStream) => set({ remoteStream })
}));

export default useCallData;