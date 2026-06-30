const ScooterMap = ({ scooters = [] }) => {
  const getMarkerPosition = (scooter, index) => {
    const fallback = [
      { left: "20%", top: "30%" },
      { left: "42%", top: "60%" },
      { left: "68%", top: "35%" },
      { left: "55%", top: "20%" },
      { left: "78%", top: "68%" },
    ];

    const location = scooter?.location;
    if (location?.lat != null && location?.lng != null) {
      const left = `${Math.max(10, Math.min(90, 50 + location.lng * 2))}%`;
      const top = `${Math.max(15, Math.min(85, 50 - location.lat * 2))}%`;
      return { left, top };
    }

    return fallback[index % fallback.length];
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-2xl">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-300">
            Fleet scene
          </p>
          <h3 className="text-xl font-semibold">Live scooter positions</h3>
        </div>
        <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-slate-100">
          {scooters.length} active
        </div>
      </div>
      <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2),_transparent_40%)]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute left-[15%] top-[25%] h-16 w-[55%] rounded-full border border-amber-300/40" />
        <div className="absolute left-[20%] top-[55%] h-20 w-[40%] rounded-full border border-cyan-300/30" />
        <div className="absolute left-[50%] top-[20%] h-24 w-[32%] rotate-12 rounded-full border border-emerald-300/30" />
        <div className="absolute left-[10%] top-[65%] h-2 w-[70%] -rotate-6 rounded-full bg-white/20" />
        <div className="absolute left-[30%] top-[32%] h-2 w-[40%] rotate-12 rounded-full bg-white/20" />
        <div className="absolute left-[55%] top-[48%] h-2 w-[25%] -rotate-8 rounded-full bg-white/20" />

        {scooters.map((scooter, index) => {
          const position = getMarkerPosition(scooter, index);
          return (
            <div
              key={scooter._id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: position.left, top: position.top }}
            >
              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  scooter.status === "AVAILABLE"
                    ? "bg-emerald-500"
                    : scooter.status === "IN_RIDE"
                      ? "bg-amber-400 text-slate-900"
                      : "bg-rose-500"
                }`}
              >
                {scooter.status}
              </div>
              <div className="mt-2 rounded-2xl border border-white/20 bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow">
                {scooter.name || `Scooter ${index + 1}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScooterMap;
