import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useCallData from "../zustand/useCallData";
import { useNavigate } from "react-router-dom";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";



const useCallHandlers = () => {

  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const { setCalling, userCaller, setUserCaller,
    receiverUser, setReceiverUser, localStream } = useCallData();

  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();


  // هندلر پاکسازی مقادیر تماس
  const clearCallingData = () => {
    setCalling(false);
    setUserCaller(null);
    setReceiverUser(null);
  }
  // ***


  // هندلر رفتن به صفحه شروع تماس
  const getCalling = () => {

    const isOnline = onlineUsers.includes(selectedConversation._id);

    if (isOnline) {
      const receiverUser = {
        _id: selectedConversation._id,
        fullName: selectedConversation.fullName,
        profilePic: selectedConversation.profilePic
      };
      setCalling(true);
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
    navigate("/", { replace: true });
  }
  // ***


  // هندلر لغو تماس ورودی از طرف تماس گیرنده
  const cancelIncomingCall = () => {
    toast('The call was cancelled!', {
      icon: '🔔',
    });
    clearCallingData();
    navigate("/", { replace: true });
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

  // هندلر تنظیم اعلان رد تماس برای تماس گیرنده
  const rejectOutgoingCall = () => {
    toast('The call was rejected!', {
      icon: '🔔',
    });
    clearCallingData();
    navigate("/", { replace: true });
  }
  // ***


  // هندلر رد تماس ورودی
  const rejectIncomingCall = () => {
    socket?.emit('rejectCall', {
      senderId: userCaller?._id,
      receverId: authUser?._id
    });
    clearCallingData();
    navigate("/", { replace: true });
  }
  // ***



  // هندلر قبول کردن تماس دریافتی
  const acceptIncomingCall = async () => {

    const senderId = userCaller?._id;
    const receverId = authUser?._id;


    socket?.emit('answerIncomingCall', {
      senderId,
      receverId,
      localStream
    });
    setCalling(false);
  }
  // ***


  // هندلر قبول شدن تماس خروجی
  const answerOutgoingCall = (data) => {
    const { callId } = data;
    setCalling(false);
  }
  // ***


  // 
  const callEnd = () => {
    const id = receiverUser?._id || userCaller?._id;
    socket?.emit('callEnd', { receverId: id });
    clearCallingData();
    navigate("/", { replace: true });
  }
  // ***

  //
  const callEnded = () => {
    clearCallingData();
    navigate("/", { replace: true });
  }

  // ***


  return {
    getCalling,
    setIncomingCall,
    rejectIncomingCall,
    cancelOutgoingCall,
    cancelIncomingCall,
    rejectOutgoingCall,
    acceptIncomingCall,
    answerOutgoingCall,
    callEnd,
    callEnded
  }
}

export default useCallHandlers;