import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useCallData from "../zustand/useCallData";
import { useNavigate } from "react-router-dom";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";



const useCallHandlers = () => {

  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const { calling, setCalling, userCaller, setUserCaller, receiverUser, setReceiverUser } = useCallData();
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();


  // هندلر پاکسازی مقادیر تماس
  const clearCallingData = () => {
    setCalling(false);
    setUserCaller(null);
    setReceiverUser(null);
  }
  // ***


  // هندلر ارسال تماس
  const sendCall = () => {

    const isOnline = onlineUsers.includes(selectedConversation._id);

    if (isOnline) {
      const receiverUser = {
        _id: selectedConversation._id,
        fullName: selectedConversation.fullName,
        profilePic: selectedConversation.profilePic
      };
      setReceiverUser(receiverUser);

      navigate("/calling", {
        state: {
          callSender: true,
          callReceiver: false,
        }
      })

    } else {
      toast.error("It is not possible to contact the offline user !");
    }
  }
  // ***


  // هندلر لغو تماس خروجی
  const cancelOutgoingCall = () => {
    clearCallingData();
    socket?.emit('cancelCall', {
      senderId: userCaller?._id,
      receverId: receiverUser?._id
    });
    navigate("/");
  }
  // ***


  // هندلر لغو تماس ورودی از طرف تماس گیرنده
  const cancelIncomingCall = () => {
    clearCallingData();
    navigate("/");
  }
  // ***


  // هندلر تنظیم اعلان های تماس دریافتی
  const setIncomingCall = (user) => {
    setCalling(true);
    setUserCaller(user);
    navigate("/calling", {
      state: {
        callSender: false,
        callReceiver: true,
      }
    })
  }
  // ***



  const receiveCalling = () => {

  }

  const rejectIncomingCall = () => {
    clearCallingData();
    navigate("/");
  }


  return {
    sendCall,
    setIncomingCall,
    rejectIncomingCall,
    cancelOutgoingCall,
    cancelIncomingCall
  }
}

export default useCallHandlers;