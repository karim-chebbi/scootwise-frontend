import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await login(form);
      const role = String(response.user?.role || "RIDER").toUpperCase();

      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "TECHNICIAN" || role === "MAINTENANCE") {
        navigate("/maintenance");
      } else {
        navigate("/rider");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f8fafc,_#eef2f7_55%,_#e2e8f0)] px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-slate-950 p-10 text-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-lg">
              🛴
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
              ScootWise
            </p>
            <h1 className="mt-4 text-4xl font-semibold">
              Ride smarter with a premium fleet platform.
            </h1>
            <p className="mt-4 max-w-md text-sm text-slate-300">
              Monitor scooters, launch rides, and keep operations moving in real
              time.
            </p>
          </div>
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your workspace.
            </p>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0"
                  value={form.password}
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                />
              </div>
              {error ? <p className="text-sm text-rose-600">{error}</p> : null}
              <Button className="w-full" type="submit">
                Sign in
              </Button>
            </form>
            <p className="mt-6 text-sm text-slate-500">
              New here?{" "}
              <Link className="font-semibold text-slate-900" to="/register">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
