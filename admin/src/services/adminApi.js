// FETCH ALL USERS
export const fetchUsers = async () => {
  const res = await fetch("/api/admin/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

// DELETE USER
export const deleteUser = async (userId) => {
  const res = await fetch(`/api/admin/users/${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.json();
};
