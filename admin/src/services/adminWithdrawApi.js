export const updateWithdrawStatus = async (id, status) => {
  const res = await fetch(`/api/admin/withdraws/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Update failed");
};