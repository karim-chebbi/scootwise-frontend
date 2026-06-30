import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import ScooterMap from "../../components/map/ScooterMap";
import { useSocket } from "../../context/SocketContext";
import { getScooters } from "../../services/scooter.service";
import { startRide } from "../../services/ride.service";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedScooterId, setSelectedScooterId] = useState("");
  const navigate = useNavigate();
  const { scooters, setScooters, connected } = useSocket();

  useEffect(() => {
    const loadScooters = async () => {
      try {
        const data = await getScooters();
        setScooters(data);
        if (data[0]) setSelectedScooterId(data[0]._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadScooters();
  }, [setScooters]);

  const handleStartRide = async () => {
    try {
      const ride = await startRide(selectedScooterId);
      navigate(`/rider/ride/${ride._id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Loader label="Loading scooters" />;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-400">
              Rider experience
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Start a ride in seconds
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Pick a scooter, start your ride, and monitor your trip as it
              updates live.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            Socket {connected ? "connected" : "connecting"}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ScooterMap scooters={scooters} />
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              Ready to ride
            </h3>
            <select
              className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3"
              value={selectedScooterId}
              onChange={(event) => setSelectedScooterId(event.target.value)}
            >
              {scooters.map((scooter) => (
                <option key={scooter._id} value={scooter._id}>
                  {scooter.name || "Scooter"} · {scooter.status}
                </option>
              ))}
            </select>
            {error ? (
              <p className="mt-3 text-sm text-rose-600">{error}</p>
            ) : null}
            <Button className="mt-5 w-full" onClick={handleStartRide}>
              Start Ride
            </Button>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Trip insights
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span>Live tracking</span>
                <span className="font-semibold text-slate-900">Enabled</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span>Estimated cost</span>
                <span className="font-semibold text-slate-900">$0.25/min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
