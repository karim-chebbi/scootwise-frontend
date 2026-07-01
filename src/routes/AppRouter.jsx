import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Home from "../pages/rider/Home";
import Ride from "../pages/rider/Ride";
import History from "../pages/rider/History";
import ReportIssue from "../pages/rider/ReportIssue";
import Dashboard from "../pages/admin/Dashboard";
import Rides from "../pages/admin/Rides";
import Scooters from "../pages/admin/Scooters";
import Maintenance from "../pages/admin/Maintenance";
import Tickets from "../pages/maintenance/Tickets";

const ProtectedLayout = ({ children }) => (
  <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#eef2f7_55%,_#e2e8f0)] text-slate-900">
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  </div>
);

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user?.role))
    return <Navigate to="/login" replace />;
  return children;
};

const AppRouter = () => {
  const { isAuthenticated, user } = useAuth();
  const role = String(user?.role || "RIDER").toUpperCase();
  const homePath =
    role === "ADMIN"
      ? "/admin"
      : role === "TECHNICIAN" || role === "MAINTENANCE"
        ? "/maintenance"
        : "/rider";

  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to={homePath} replace /> : <Login />
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? homePath : "/login"} replace />
        }
      />

      <Route
        path="/rider"
        element={
          <ProtectedLayout>
            <RoleRoute allowedRoles={["RIDER"]}>
              <Home />
            </RoleRoute>
          </ProtectedLayout>
        }
      />
      <Route
        path="/rider/ride/:rideId"
        element={
          <ProtectedLayout>
            <RoleRoute allowedRoles={["RIDER"]}>
              <Ride />
            </RoleRoute>
          </ProtectedLayout>
        }
      />
      <Route
        path="/rider/history"
        element={
          <ProtectedLayout>
            <RoleRoute allowedRoles={["RIDER"]}>
              <History />
            </RoleRoute>
          </ProtectedLayout>
        }
      />
      <Route
        path="/rider/report"
        element={
          <ProtectedLayout>
            <RoleRoute allowedRoles={["RIDER"]}>
              <ReportIssue />
            </RoleRoute>
          </ProtectedLayout>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedLayout>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </RoleRoute>
          </ProtectedLayout>
        }
      />
      <Route
        path="/admin/rides"
        element={
          <ProtectedLayout>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <Rides />
            </RoleRoute>
          </ProtectedLayout>
        }
      />
      <Route
        path="/admin/scooters"
        element={
          <ProtectedLayout>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <Scooters />
            </RoleRoute>
          </ProtectedLayout>
        }
      />
      <Route
        path="/admin/maintenance"
        element={
          <ProtectedLayout>
            <RoleRoute allowedRoles={["ADMIN"]}>
              <Maintenance />
            </RoleRoute>
          </ProtectedLayout>
        }
      />

      <Route
        path="/maintenance"
        element={
          <ProtectedLayout>
            <RoleRoute allowedRoles={["TECHNICIAN", "MAINTENANCE"]}>
              <Tickets />
            </RoleRoute>
          </ProtectedLayout>
        }
      />
    </Routes>
  );
};

export default AppRouter;
