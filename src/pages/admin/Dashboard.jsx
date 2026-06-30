import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import ScooterMap from "../../components/map/ScooterMap";
import { useSocket } from "../../context/SocketContext";
import { getDashboardStats } from "../../services/ride.service";
import { getScooters } from "../../services/scooter.service";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);

const Dashboard = () => {
  const { scooters, setScooters, connected, liveEvents } = useSocket();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeRides: 0,
    fleetHealth: 0,
    revenue: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [scooterData, dashboardStats] = await Promise.all([
          getScooters(),
          getDashboardStats(),
        ]);
        setScooters(scooterData);
        setStats(dashboardStats);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [setScooters]);

  if (loading) return <Loader label="Loading dashboard" />;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] bg-gradient-to-br from-emerald-500 to-emerald-400 p-6 text-white shadow-lg">
          <p className="text-sm text-white/80">Active rides</p>
          <p className="mt-3 text-3xl font-semibold">{stats.activeRides}</p>
        </div>
        <div className="rounded-[24px] bg-gradient-to-br from-sky-500 to-cyan-400 p-6 text-white shadow-lg">
          <p className="text-sm text-white/80">Fleet health</p>
          <p className="mt-3 text-3xl font-semibold">{stats.fleetHealth}%</p>
        </div>
        <div className="rounded-[24px] bg-gradient-to-br from-violet-500 to-fuchsia-400 p-6 text-white shadow-lg">
          <p className="text-sm text-white/80">Revenue</p>
          <p className="mt-3 text-3xl font-semibold">
            {formatCurrency(stats.revenue)}
          </p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ScooterMap scooters={scooters} />
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900">Live feed</h3>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              {connected ? "Connected" : "Offline"}
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {liveEvents.map((event, index) => (
              <div
                key={`${event.rideId || index}-${index}`}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600"
              >
                {event.rideId
                  ? `Ride ${event.rideId.slice(0, 6)} updated`
                  : "Socket event received"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
