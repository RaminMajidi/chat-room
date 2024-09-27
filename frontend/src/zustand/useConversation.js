import { create } from 'zustand'


// const activeHandler = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//     return stream
// }

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),   
    }));

export default useConversation;


// if (active) {

// } else {
//     stream?.getTracks().forEach((track) => {
//         track.stop();
//     });
// }