import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        if (authUser) {
            const socketInstance = io("http://localhost:4000//", {
                query: {
                    userId: authUser?._id,
                }
            });

            socketInstance.on("getOnlineUsers", (users) => {
                setOnlineUser(users);
            });

            setSocket(socketInstance);

            return () => socketInstance.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUser }}>
            {children}
        </SocketContext.Provider>
    );
};

// ✅ Export both functions
export default SocketContextProvider;
