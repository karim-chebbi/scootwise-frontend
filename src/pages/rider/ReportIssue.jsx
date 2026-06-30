import { useState } from "react";
import Button from "../../components/common/Button";
import { reportIssue } from "../../services/maintenance.service";

const ReportIssue = () => {
  const [form, setForm] = useState({ scooterId: "", issue: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await reportIssue(form);
      setMessage("Issue reported successfully");
      setForm({ scooterId: "", issue: "" });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-400">
          Support
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">
          Report a scooter issue
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Flag a problem so the operations team can act fast.
        </p>
      </div>
      <form className="mt-8 max-w-2xl space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Scooter ID
          </label>
          <input
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            value={form.scooterId}
            onChange={(event) =>
              setForm({ ...form, scooterId: event.target.value })
            }
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Issue
          </label>
          <textarea
            className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3"
            value={form.issue}
            onChange={(event) =>
              setForm({ ...form, issue: event.target.value })
            }
          />
        </div>
        {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        <Button type="submit">Submit report</Button>
      </form>
    </div>
  );
};

export default ReportIssue;
