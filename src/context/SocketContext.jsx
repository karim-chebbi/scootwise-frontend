import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { connectSocket } from "../socket/socket";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [scooters, setScooters] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [activeRide, setActiveRide] = useState(null);

  useEffect(() => {
    if (!token) {
      setConnected(false);
      setSocket(null);
      return undefined;
    }

    const client = connectSocket(token);
    setSocket(client);

    client.on("connect", () => setConnected(true));
    client.on("disconnect", () => setConnected(false));

    client.on("ride:started", (payload) => {
      setLiveEvents((prev) => [payload, ...prev].slice(0, 8));
      setActiveRide(payload);
    });

    client.on("ride:ended", (payload) => {
      setLiveEvents((prev) => [payload, ...prev].slice(0, 8));
      setActiveRide(null);
    });

    client.on("scooter:locationUpdated", (payload) => {
      setScooters((prev) =>
        prev.map((scooter) =>
          scooter._id === payload.scooterId
            ? { ...scooter, location: payload.location }
            : scooter,
        ),
      );
    });

    client.on("scooter:statusUpdated", (payload) => {
      setScooters((prev) =>
        prev.map((scooter) =>
          scooter._id === payload.scooterId
            ? { ...scooter, status: payload.status, isLocked: payload.isLocked }
            : scooter,
        ),
      );
    });

    return () => {
      client.removeAllListeners();
      client.disconnect();
    };
  }, [token]);

  const value = useMemo(
    () => ({
      socket,
      connected,
      scooters,
      setScooters,
      liveEvents,
      activeRide,
      setActiveRide,
    }),
    [socket, connected, scooters, liveEvents, activeRide],
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
