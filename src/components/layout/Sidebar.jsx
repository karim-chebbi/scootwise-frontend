import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/rider", label: "Ride", role: "rider" },
  { to: "/rider/history", label: "Ride History", role: "rider" },
  { to: "/rider/report", label: "Report Issue", role: "rider" },
  { to: "/admin", label: "Dashboard", role: "admin" },
  { to: "/admin/rides", label: "Ride Monitor", role: "admin" },
  { to: "/admin/scooters", label: "Scooter Fleet", role: "admin" },
  { to: "/admin/maintenance", label: "Maintenance", role: "admin" },
  { to: "/maintenance", label: "Maintenance Desk", role: "maintenance" },
];

const Sidebar = () => {
  const { user, logout } = useAuth();

  const role = (user?.role || "RIDER").toUpperCase();
  const filteredLinks = links.filter((link) => {
    if (link.role === "rider") return role === "RIDER";
    if (link.role === "admin") return role === "ADMIN";
    if (link.role === "maintenance")
      return role === "TECHNICIAN" || role === "MAINTENANCE";
    return true;
  });

  return (
    <aside className="hidden min-h-screen w-72 flex-col border-r border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur lg:flex">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
          ScootWise
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Operations Hub
        </h2>
      </div>
      <nav className="space-y-2">
        {filteredLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? "bg-slate-900 text-white shadow-lg" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          {user?.name || "Operator"}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {user?.email || "Signed in"}
        </p>
        <button
          onClick={logout}
          className="mt-4 w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
