const Loader = ({ label = "Loading..." }) => (
  <div className="flex min-h-[240px] items-center justify-center rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm backdrop-blur">
    <div className="flex flex-col items-center gap-3 text-slate-600">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  </div>
);

export default Loader;
