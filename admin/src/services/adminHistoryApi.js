const API_BASE = "http://localhost:5000/api/admin";

export const fetchDeposits = async ({ page, limit, q }) => {
  const res = await fetch(
    `/api/admin/deposits?page=${page}&limit=${limit}&q=${q}`
  );

  if (!res.ok) {
    return { data: [], total: 0 };
  }

  return res.json();
};



export const fetchWithdraws = async ({ page, limit, q }) => {
  const res = await fetch(
    `/api/admin/withdraws?page=${page}&limit=${limit}&q=${q}`
  );
  if (!res.ok) {
    return { data: [], total: 0 };
  }

  return res.json();
};


