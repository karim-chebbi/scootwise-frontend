const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-700 focus:ring-slate-500",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300",
    danger: "bg-rose-600 text-white hover:bg-rose-500 focus:ring-rose-400",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-500 focus:ring-emerald-400",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
