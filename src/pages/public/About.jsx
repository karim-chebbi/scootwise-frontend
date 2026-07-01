import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#eef2f7_55%,_#e2e8f0)]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-3xl">🛴</div>
            <h1 className="text-xl font-bold text-slate-900">ScootWise</h1>
          </Link>
          <div className="flex gap-4">
            <Link
              to="/about"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 text-6xl">🛴</div>
          <h1 className="text-5xl font-bold text-slate-900">
            Smart Scooter Fleet Management
          </h1>
          <p className="mt-4 text-xl text-slate-600">
            Transform how you run your micro-mobility business
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
            <span className="text-4xl">⚠️</span> The Problem
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Managing a scooter fleet is complex. You need to track dozens of
            devices across the city, monitor battery levels, handle maintenance
            requests, and calculate costs in real-time. Without the right tools,
            you're left with spreadsheets, manual updates, and lost revenue.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
            <span className="text-4xl">✨</span> Our Solution
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            ScootWise is a complete platform built for scooter operators. See
            your entire fleet in one place, manage rides in real-time, track
            maintenance needs, and automatically calculate costs per minute.
          </p>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Why Operators Love ScootWise
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Benefit 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg">
              <div className="mb-4 text-5xl">📍</div>
              <h3 className="text-xl font-bold text-slate-900">
                Real-Time Fleet Tracking
              </h3>
              <p className="mt-2 text-slate-600">
                See every scooter on a live map. Know which are available, in
                use, or in maintenance instantly.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg">
              <div className="mb-4 text-5xl">💰</div>
              <h3 className="text-xl font-bold text-slate-900">
                Auto Cost Calculation
              </h3>
              <p className="mt-2 text-slate-600">
                Prices calculated automatically per minute of ride. No manual
                work. No billing errors. Transparent revenue tracking.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg">
              <div className="mb-4 text-5xl">🔋</div>
              <h3 className="text-xl font-bold text-slate-900">
                Battery Management
              </h3>
              <p className="mt-2 text-slate-600">
                Monitor battery levels in real-time. Schedule maintenance before
                problems happen. Maximize uptime.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg">
              <div className="mb-4 text-5xl">📊</div>
              <h3 className="text-xl font-bold text-slate-900">
                Smart Analytics
              </h3>
              <p className="mt-2 text-slate-600">
                Dashboard with active rides, fleet health, and revenue metrics.
                Make data-driven decisions.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg">
              <div className="mb-4 text-5xl">👥</div>
              <h3 className="text-xl font-bold text-slate-900">
                Team Collaboration
              </h3>
              <p className="mt-2 text-slate-600">
                Admins manage fleet. Technicians handle maintenance. Riders
                enjoy hassle-free mobility.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-lg">
              <div className="mb-4 text-5xl">⚡</div>
              <h3 className="text-xl font-bold text-slate-900">Live Updates</h3>
              <p className="mt-2 text-slate-600">
                Real-time socket connections keep everyone in sync. Instant
                notifications for rides and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">
            Platform Features
          </h2>
          <div className="space-y-4">
            {[
              {
                emoji: "🚴",
                title: "Rider App",
                desc: "Find scooters, start rides, pay instantly",
              },
              {
                emoji: "👨‍💼",
                title: "Admin Dashboard",
                desc: "Manage fleet, track rides, monitor revenue",
              },
              {
                emoji: "🔧",
                title: "Maintenance Portal",
                desc: "Track issues, schedule repairs, update status",
              },
              {
                emoji: "📡",
                title: "Live Synchronization",
                desc: "All data synced in real-time via WebSocket",
              },
              {
                emoji: "💳",
                title: "Automatic Billing",
                desc: "Per-minute pricing, instant invoicing",
              },
              {
                emoji: "🛡️",
                title: "Secure & Scalable",
                desc: "JWT auth, role-based access, MongoDB",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex-shrink-0 text-4xl">{feature.emoji}</div>
                <div>
                  <h3 className="font-bold text-slate-900">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Join operators who are already running smarter fleets with
            ScootWise.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Link
              to="/register"
              className="rounded-full bg-slate-900 px-8 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Create Account
            </Link>
            <Link
              to="/contact"
              className="rounded-full border-2 border-slate-900 px-8 py-3 font-semibold text-slate-900 hover:bg-slate-50"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-6 py-12 text-center">
        <p className="text-slate-600">
          © 2026 ScootWise. Smart mobility management made simple.
        </p>
      </footer>
    </div>
  );
};

export default About;
