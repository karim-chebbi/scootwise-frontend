import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import { useSocket } from "../../context/SocketContext";
import { endRide } from "../../services/ride.service";

const Ride = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const { activeRide, liveEvents, connected } = useSocket();
  const [elapsed, setElapsed] = useState(0);
  const [cost, setCost] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startedAt) / 1000);
      setElapsed(seconds);
      setCost((seconds * 0.25).toFixed(2));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentRide = useMemo(
    () => (activeRide?.rideId === rideId ? activeRide : null),
    [activeRide, rideId],
  );

  const handleEndRide = async () => {
    try {
      await endRide(rideId);
      navigate("/rider/history");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-400">
              Active ride
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              You’re in motion
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              The live timer and fare update automatically from your connected
              socket stream.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            Socket {connected ? "live" : "offline"}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Ride duration</p>
              <p className="mt-2 text-5xl font-semibold text-slate-900">
                {elapsed}s
              </p>
            </div>
            <div className="rounded-3xl bg-slate-900 px-4 py-3 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Cost
              </p>
              <p className="mt-2 text-2xl font-semibold">${cost}</p>
            </div>
          </div>
          <div className="mt-8 rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">
              Current trip status
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {currentRide
                ? "Ride is live and syncing"
                : "Waiting on backend confirmation"}
            </p>
          </div>
          <Button className="mt-8" variant="danger" onClick={handleEndRide}>
            End Ride
          </Button>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Live events</h3>
          <div className="mt-4 space-y-3">
            {liveEvents.map((event, index) => (
              <div
                key={`${event.rideId || index}-${index}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {event.rideId
                  ? `Ride ${event.rideId.slice(0, 6)} updated`
                  : "System event received"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ride;
