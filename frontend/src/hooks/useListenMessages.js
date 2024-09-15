import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'
import notificationSound from "../assets/sounds/notification.mp3"
import { useAuthContext } from '../context/AuthContext'
import useGetConversation from './useGetConversation'
import { messageAlert } from '../utils/Alerts'


const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  const { conversations } = useGetConversation();

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      if (selectedConversation?._id === newMessage.senderId) {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
        const sound = new Audio(notificationSound);
        sound.play();
        return
      }
      if (newMessage.receiverId === authUser._id && selectedConversation?._id !== newMessage.senderId) {
        const sender = conversations.find(item => item._id === newMessage.senderId);
        messageAlert(sender.fullName);
        const sound = new Audio(notificationSound);
        sound.play();
        return
      }
    });
    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages, conversations])

}

export default useListenMessages