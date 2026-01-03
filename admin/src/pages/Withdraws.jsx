import { useEffect, useState } from "react";

const Withdraws = () => {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await fetch("/api/admin/withdraws");
    const json = await res.json();
    setData(Array.isArray(json) ? json : []);
  };

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/withdraws/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Withdraw Requests</h1>

      <div className="bg-white border rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Balance</th>
              <th className="px-4 py-3 text-left">Withdraw</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((w) => (
              <tr key={w._id} className="border-t">
                <td className="px-4 py-3">
                  <div className="font-semibold">{w.userId?.username}</div>
                  <div className="text-xs text-slate-500">
                    {w.userId?.email}
                  </div>
                </td>

                {/* ✅ CASH EARNED FROM GAMES */}
                <td className="px-4 py-3 font-semibold text-green-600">
                  ₹{w.userId?.balance ?? 0}
                </td>

                <td className="px-4 py-3 font-semibold text-red-600">
                  ₹{w.amount}
                </td>

                <td className="px-4 py-3 uppercase">
                  {w.method}
                </td>

                <td className="px-4 py-3 capitalize">
                  {w.status}
                </td>

                <td className="px-4 py-3">
                  {w.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(w._id, "approved")}
                        className="text-green-600 font-semibold mr-3"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(w._id, "rejected")}
                        className="text-red-600 font-semibold"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Withdraws;
