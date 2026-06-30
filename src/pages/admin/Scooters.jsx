import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import {
  createScooter,
  deleteScooter,
  getScooters,
} from "../../services/scooter.service";

const Scooters = () => {
  const [scooters, setScooters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", battery: 100, imageUrl: "" });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getScooters();
        setScooters(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    const created = await createScooter({
      ...form,
      battery: Number(form.battery),
      imageUrl: form.imageUrl?.trim() || "",
    });
    setScooters((prev) => [created, ...prev]);
    setForm({ name: "", battery: 100, imageUrl: "" });
  };

  const handleDelete = async (id) => {
    await deleteScooter(id);
    setScooters((prev) => prev.filter((scooter) => scooter._id !== id));
  };

  if (loading) return <Loader label="Loading fleet" />;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-3xl font-semibold text-slate-900">Scooter fleet</h2>
        <p className="mt-2 text-sm text-slate-500">
          Manage the live scooter inventory and add new units.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <form
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleCreate}
        >
          <h3 className="text-xl font-semibold text-slate-900">Add scooter</h3>
          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Battery
              </label>
              <input
                type="number"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                value={form.battery}
                onChange={(event) =>
                  setForm({ ...form, battery: event.target.value })
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Image URL
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
                placeholder="https://example.com/scooter.jpg"
                value={form.imageUrl}
                onChange={(event) =>
                  setForm({ ...form, imageUrl: event.target.value })
                }
              />
            </div>
          </div>
          <Button className="mt-6" type="submit">
            Create scooter
          </Button>
        </form>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Scooter
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Battery
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {scooters.map((scooter) => (
                <tr key={scooter._id}>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {scooter.imageUrl ? (
                      <a
                        href={scooter.imageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-12 w-12 overflow-hidden rounded-xl border border-slate-200"
                      >
                        <img
                          src={scooter.imageUrl}
                          alt={scooter.name}
                          className="h-full w-full object-cover"
                        />
                      </a>
                    ) : (
                      <span className="text-slate-400">No image</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {scooter.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {scooter.status}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {scooter.battery}%
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      type="button"
                      onClick={() => handleDelete(scooter._id)}
                      className="rounded-full bg-rose-50 px-3 py-1 font-medium text-rose-600 transition hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scooters;
