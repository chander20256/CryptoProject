import { useEffect, useState, useMemo } from "react";
import { fetchDeposits } from "../services/adminHistoryApi";

const PAGE_SIZE = 10;

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "approved", label: "Approved" },
  { key: "pending", label: "Pending" },
  { key: "rejected", label: "Rejected" },
];

const Deposits = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");

  const loadDeposits = async (silent = false) => {
    try {
      if (!silent) setLoading(true);

      const res = await fetchDeposits({
        page,
        limit: PAGE_SIZE,
        q: query,
      });

      setData(Array.isArray(res.data) ? res.data : []);
      setTotal(res.total ?? 0);
    } catch (err) {
      console.error("Failed to fetch deposits", err);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  /* INITIAL LOAD + SEARCH / PAGE CHANGE */
  useEffect(() => {
    loadDeposits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  /* 🔁 AUTO REFRESH (EVERY 10s) */
  useEffect(() => {
    const interval = setInterval(() => {
      loadDeposits(true); // silent refresh
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return data;
    return data.filter((d) => d.status === statusFilter);
  }, [data, statusFilter]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading deposits…
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">Deposit History</h1>

          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search by username or email…"
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            className="
              w-full sm:w-72
              border rounded-lg px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-cyan-500
            "
          />
        </div>

        {/* STATUS FILTER */}
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-semibold border transition
                ${
                  statusFilter === f.key
                    ? "bg-cyan-500 text-white border-cyan-500"
                    : "bg-white hover:bg-slate-100"
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-x-auto shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Points</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No deposits found
                </td>
              </tr>
            ) : (
              filteredData.map((d) => (
                <tr
                  key={d._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold">
                      {d.userId?.username || "Unknown"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {d.userId?.email}
                    </div>
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {d.method || "-"}
                  </td>

                  <td className="px-4 py-3 font-semibold text-green-600">
                    ₹{d.amount}
                  </td>

                  <td className="px-4 py-3 font-semibold text-cyan-600">
                    {d.points}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        d.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : d.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(d.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg text-sm font-semibold border disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg text-sm font-semibold border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Deposits;
