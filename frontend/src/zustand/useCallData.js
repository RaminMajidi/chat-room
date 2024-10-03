import { create } from 'zustand'

const useCallData = create((set) => ({
    calling: false,
    setCalling: (calling) => set({ calling }),
    userCaller: null,
    setUserCaller: (userCaller) => set({ userCaller }),
    receiverUser: null,
    setReceiverUser: (receiverUser) => set({ receiverUser })
}));

export default useCallData;