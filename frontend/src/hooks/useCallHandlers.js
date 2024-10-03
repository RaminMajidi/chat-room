import { useEffect, useRef, useState } from "react";

import useCallData from "../zustand/useCallData";
import { useNavigate } from "react-router-dom";
import useConversation from "../zustand/useConversation";


const useCallHandlers = () => {

  const navigate = useNavigate()
  const { calling, setCalling, setUserCaller, setReceiverUser } = useCallData();
  const { selectedConversation } = useConversation();

  const senderCalling = () => {

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
    senderCalling,
    setIncomingCall,
    rejectIncomingCall,
    cancelOutgoingCall
  }
}

export default useCallHandlers;