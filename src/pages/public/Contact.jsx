import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to a backend service
    console.log("Contact form submitted:", form);
    setSubmitted(true);
    setTimeout(() => {
      setForm({ name: "", email: "", company: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

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

      {/* Hero */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 text-6xl">💬</div>
          <h1 className="text-5xl font-bold text-slate-900">Get in Touch</h1>
          <p className="mt-4 text-xl text-slate-600">
            Questions? Let's talk about how ScootWise can help your fleet.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                We're here to help 🤝
              </h2>
              <p className="text-lg text-slate-600">
                Whether you're an operator looking to streamline your fleet or a
                rider with feedback, we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-4xl">📧</div>
                <div>
                  <h3 className="font-bold text-slate-900">Email</h3>
                  <p className="text-slate-600">
                    <a
                      href="mailto:hello@scootwise.com"
                      className="hover:text-slate-900"
                    >
                      hello@scootwise.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-4xl">📱</div>
                <div>
                  <h3 className="font-bold text-slate-900">Phone</h3>
                  <p className="text-slate-600">
                    <a href="tel:+1234567890" className="hover:text-slate-900">
                      +1 (234) 567-890
                    </a>
                  </p>
                </div>
              </div>

              {/* Office */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-4xl">📍</div>
                <div>
                  <h3 className="font-bold text-slate-900">Headquarters</h3>
                  <p className="text-slate-600">
                    San Francisco, CA
                    <br />
                    United States
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-4xl">🕐</div>
                <div>
                  <h3 className="font-bold text-slate-900">Hours</h3>
                  <p className="text-slate-600">
                    Mon - Fri: 9 AM - 6 PM PT
                    <br />
                    Sat - Sun: 10 AM - 4 PM PT
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div className="text-6xl">✅</div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Thank you!
                </h3>
                <p className="text-slate-600">
                  We've received your message and will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    placeholder="Your company (optional)"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    required
                    rows="5"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            Follow ScootWise
          </h2>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="text-4xl transition hover:scale-110"
              title="Twitter"
            >
              🐦
            </a>
            <a
              href="#"
              className="text-4xl transition hover:scale-110"
              title="LinkedIn"
            >
              💼
            </a>
            <a
              href="#"
              className="text-4xl transition hover:scale-110"
              title="GitHub"
            >
              🐙
            </a>
            <a
              href="#"
              className="text-4xl transition hover:scale-110"
              title="Instagram"
            >
              📸
            </a>
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

export default Contact;
