import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { getRides } from "../../services/ride.service";

const Rides = () => {
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

  if (loading) return <Loader label="Loading rides" />;

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-400">
          Operations
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">
          Ride monitoring
        </h2>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Ride
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Rider
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Scooter
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {rides.map((ride) => (
              <tr key={ride._id}>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {ride._id.slice(0, 8)}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {ride.user?.name || "Unknown rider"}
                </td>
                <td className="px-4 py-3 text-sm text-slate-700">
                  {ride.scooter?.name || "Unknown scooter"}
                </td>
                <td
                  className={`px-4 py-3 text-sm font-medium ${
                    ride.status === "ACTIVE"
                      ? "text-emerald-600"
                      : "text-slate-600"
                  }`}
                >
                  {ride.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rides;
