import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import {
  getMaintenanceReports,
  resolveMaintenance,
} from "../../services/maintenance.service";

const Tickets = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMaintenanceReports();
        setReports(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleResolve = async (id) => {
    await resolveMaintenance(id);
    setReports((prev) =>
      prev.map((report) =>
        report._id === id ? { ...report, status: "RESOLVED" } : report,
      ),
    );
  };

  if (loading) return <Loader label="Loading tickets" />;

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-400">
          Maintenance desk
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">
          Assigned issues
        </h2>
      </div>
      <div className="mt-6 space-y-4">
        {reports.map((report) => (
          <div
            key={report._id}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {report.issue}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Scooter: {report.scooter?.name || report.scooter}
                </p>
              </div>
              <button
                onClick={() => handleResolve(report._id)}
                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Resolve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tickets;
