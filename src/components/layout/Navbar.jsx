import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const role = (user?.role || "RIDER").toUpperCase();

  const links =
    role === "ADMIN"
      ? [
          { to: "/admin", label: "Overview" },
          { to: "/admin/rides", label: "Rides" },
          { to: "/admin/scooters", label: "Fleet" },
        ]
      : role === "TECHNICIAN" || role === "MAINTENANCE"
        ? [{ to: "/maintenance", label: "Tickets" }]
        : [
            { to: "/rider", label: "Ride" },
            { to: "/rider/history", label: "History" },
            { to: "/rider/report", label: "Report" },
          ];

  return (
    <header className="border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            ScootWise
          </p>
          <h1 className="text-xl font-semibold text-slate-900">
            Connected mobility platform
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition ${isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="ml-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {user?.name || "Guest"} · {role}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
