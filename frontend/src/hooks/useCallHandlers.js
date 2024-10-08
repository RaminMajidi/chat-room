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
  const { calling, setCalling, userCaller, setUserCaller,
    receiverUser, setReceiverUser, callId, setCallId } = useCallData();
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
    toast('The call was cancelled!', {
      icon: '🔔',
    });
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

  // هندلر تنظیم اعلان رد تماس برای تماس گیرنده
  const rejectOutgoingCall = () => {
    toast('The call was rejected!', {
      icon: '🔔',
    });
    clearCallingData();
    navigate('/');
  }
  // ***


  // هندلر رد تماس ورودی
  const rejectIncomingCall = () => {
    socket?.emit('rejectCall', {
      senderId: userCaller?._id,
      receverId: authUser?._id
    });
    clearCallingData();
    navigate("/");
  }
  // ***



  // هندلر قبول کردن تماس دریافتی
  const acceptIncomingCall = () => {

    const senderId = userCaller?._id;
    const callId = userCaller?._id + "-" + authUser?._id;
    setCallId(callId);

    socket?.emit('answerIncomingCall', {
      callId,
      senderId,
    });

    navigate(`/videoCall/${callId}`, {
      state: {
        sender: false,
        callId,
        senderId
      }
    });
  }
  // ***


  // هندلر قبول شدن تماس خروجی
  const answerOutgoingCall = (data) => {
    console.log(data);
    const { callId } = data;
    setCallId(callId);

    navigate(`/videoCall/${data.callId}`, {
      state: {
        sender: true,
        callId
      }
    });
  }
  // ***



  return {
    sendCall,
    setIncomingCall,
    rejectIncomingCall,
    cancelOutgoingCall,
    cancelIncomingCall,
    rejectOutgoingCall,
    acceptIncomingCall,
    answerOutgoingCall
  }
}

export default useCallHandlers;