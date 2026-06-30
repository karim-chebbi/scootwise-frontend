import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await register(form);
      navigate("/login");
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
              Launch your mobility team.
            </h1>
            <p className="mt-4 max-w-md text-sm text-slate-300">
              Create an account and join the live scooter network.
            </p>
          </div>
          <div className="p-8 sm:p-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              Create account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Join as a rider or ask an admin to assign a role.
            </p>
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0"
                  value={form.name}
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
              </div>
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
                Register
              </Button>
            </form>
            <p className="mt-6 text-sm text-slate-500">
              Already registered?{" "}
              <Link className="font-semibold text-slate-900" to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
