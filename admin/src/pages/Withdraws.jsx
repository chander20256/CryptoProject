import { useEffect, useState } from "react";

const Withdraws = () => {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await fetch("/api/admin/withdraws");
    setData(await res.json());
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

      <table className="min-w-full text-sm bg-white border rounded-xl">
        <thead className="bg-slate-100">
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((w) => (
            <tr key={w._id} className="border-t">
              <td>{w.userId?.username}</td>
              <td>₹{w.amount}</td>
              <td>{w.method}</td>
              <td>{w.status}</td>
              <td>
                {w.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateStatus(w._id, "approved")}
                      className="text-green-600 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(w._id, "rejected")}
                      className="text-red-600"
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
  );
};

export default Withdraws;
