import { useEffect, useRef, useState } from "react";

import useCallData from "../zustand/useCallData";


const useCallHandlers = () => {

  const { calling, setCalling, setUserCaller } = useCallData();

  const rejectIncomingCall = () => {
    setCalling(false);
    setUserCaller(null);
  }

  const setIncomingCall = (user) => {
    setCalling(true);
    setUserCaller(user);
  }

  return { setIncomingCall, rejectIncomingCall }
}

export default useCallHandlers;