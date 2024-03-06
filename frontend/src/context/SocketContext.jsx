import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

const BASE_URL = import.meta.env.VITE_BASE_URL;

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState(null);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const SOCKET = io(BASE_URL, {
                query: {
                    userId: authUser._id
                }
            });
            setSocket(SOCKET);
            SOCKET.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => socket?.close();

        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }

    }, [authUser])

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    )
}
