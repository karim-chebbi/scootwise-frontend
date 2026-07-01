import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-12 w-full max-w-5xl rounded-3xl border border-slate-200 bg-white/50 backdrop-blur-sm px-8 py-6 shadow-lg">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛴</span>
            <span className="font-semibold text-slate-900">ScootWise</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Premium fleet management platform
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Explore
          </h3>
          <div className="mt-3 space-y-2">
            <div>
              <Link
                to="/about"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                About us
              </Link>
            </div>
            <div>
              <Link
                to="/contact"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Get Started
            </h3>
            <p className="mt-3 text-sm text-slate-600">Ready to ride?</p>
          </div>
          <Link
            to="/register"
            className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors w-fit"
          >
            Sign up →
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-slate-200" />

      {/* Bottom */}
      <div className="flex flex-col gap-2 text-center text-xs text-slate-500 md:flex-row md:justify-between md:text-left">
        <p>&copy; {new Date().getFullYear()} ScootWise. All rights reserved.</p>
        <p>Built for modern mobility</p>
      </div>
    </footer>
  );
}

export default Footer