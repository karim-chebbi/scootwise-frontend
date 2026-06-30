import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import {
  getMaintenanceReports,
  resolveMaintenance,
} from "../../services/maintenance.service";

const Maintenance = () => {
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

  if (loading) return <Loader label="Loading maintenance queue" />;

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-400">
          Maintenance
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">
          Issue queue
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
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                  {report.status}
                </span>
                <Button
                  variant="success"
                  onClick={() => handleResolve(report._id)}
                >
                  Mark fixed
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;
