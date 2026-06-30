import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import { getRides, endRide } from "../../services/ride.service";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);

const History = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getRides();
        setRides(data);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleEndRide = async (rideId) => {
    try {
      await endRide(rideId);
      setRides((prev) =>
        prev.map((ride) =>
          ride._id === rideId ? { ...ride, status: "COMPLETED" } : ride,
        ),
      );
    } catch (err) {
      console.error("Failed to end ride:", err);
    }
  };

  if (loading) return <Loader label="Loading ride history" />;

  const activeRides = rides.filter((ride) => ride.status === "ACTIVE");
  const completedRides = rides.filter((ride) => ride.status === "COMPLETED");

  return (
    <div className="space-y-6">
      {activeRides.length > 0 && (
        <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-lg font-semibold text-amber-900">Active Rides</h3>
          <p className="mt-1 text-sm text-amber-700">
            You have {activeRides.length} active ride(s). You can end them here.
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-amber-200">
            <table className="min-w-full divide-y divide-amber-100 bg-white">
              <thead className="bg-amber-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-amber-900">
                    Scooter
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-amber-900">
                    Started
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-amber-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {activeRides.map((ride) => (
                  <tr key={ride._id}>
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {ride.scooter?.name || "Unknown scooter"}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {formatDate(ride.startTime)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Button
                        onClick={() => handleEndRide(ride._id)}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        End Ride
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-400">
              Ride history
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">
              Your recent mobility activity
            </h2>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Scooter
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {completedRides.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-sm text-slate-500"
                  >
                    No completed rides yet.
                  </td>
                </tr>
              ) : (
                completedRides.map((ride) => {
                  const duration = ride.endTime
                    ? Math.round(
                        (new Date(ride.endTime) - new Date(ride.startTime)) /
                          60000,
                      )
                    : 0;
                  return (
                    <tr key={ride._id}>
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">
                        {ride.scooter?.name || "Unknown scooter"}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {formatDate(ride.startTime)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {duration} min
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-emerald-600">
                        {formatCurrency(ride.cost || 0)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
