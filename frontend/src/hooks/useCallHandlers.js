import { useEffect, useRef, useState } from "react";

import useCallData from "../zustand/useCallData";
import { useNavigate } from "react-router-dom";
import useConversation from "../zustand/useConversation";


const useCallHandlers = () => {

  const navigate = useNavigate()
  const { calling, setCalling, setUserCaller } = useCallData();
  const { selectedConversation } = useConversation();

  const senderCalling = () => {

    const receiverUser = {
      _id: selectedConversation._id,
      fullName: selectedConversation.fullName,
      profilePic: selectedConversation.profilePic
    };

    navigate("/calling", {
      state: {
        callSender: true,
        callReceiver: false,
        receiverUser,
      }
    })
  }

  const receiveCalling = () => {

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

  return { senderCalling, setIncomingCall, rejectIncomingCall }
}

export default useCallHandlers;