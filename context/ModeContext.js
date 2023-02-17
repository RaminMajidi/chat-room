import { createContext,useState } from "react";


export  const ModeContext = createContext(
    {
        activeMode:"",
        setActiveMode:()=>{},
    }
);


