import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import useCallData from "../zustand/useCallData";
import { useNavigate } from "react-router-dom";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";


const useCallHandlers = () => {

  const navigate = useNavigate();
  const { calling, setCalling, setUserCaller, setReceiverUser } = useCallData();
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // send call
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

  const receiveCalling = () => {

  }

  const cancelOutgoingCall = () => {
    console.log("cancel Call");

  }

  const rejectIncomingCall = () => {
    setCalling(false);
    setUserCaller(null);
    navigate("/");
  }

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

  return {
    sendCall,
    setIncomingCall,
    rejectIncomingCall,
    cancelOutgoingCall
  }
}

export default useCallHandlers;