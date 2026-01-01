// import { useEffect, useState, useMemo } from "react";
// import { fetchUsers, deleteUser } from "../services/adminApi";
// import { CircleDot, Trash2 } from "lucide-react";

// const FILTERS = [
//   { key: "all", label: "All Users" },
//   { key: "online", label: "Online" },
//   { key: "offline", label: "Offline" },
//   { key: "offline_7d", label: "Offline 7+ Days" },
//   { key: "offline_30d", label: "Offline 30+ Days" },
//   { key: "offline_2m", label: "Offline 2+ Months" },
//   { key: "offline_6m", label: "Offline 6+ Months" },
//   { key: "offline_1y", label: "Offline 1+ Year" },
//   { key: "joined_7d", label: "Joined Last 7 Days" },
//   { key: "joined_30d", label: "Joined Last 30 Days" },
// ];

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [deletingId, setDeletingId] = useState(null);

//   const loadUsers = async () => {
//     try {
//       const data = await fetchUsers();
//       setUsers(data);
//     } catch (error) {
//       console.error("Failed to load users", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//     const interval = setInterval(loadUsers, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleDelete = async (userId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to permanently delete this user?"
//     );
//     if (!confirmed) return;

//     try {
//       setDeletingId(userId);
//       await deleteUser(userId);
//       setUsers((prev) => prev.filter((u) => u._id !== userId));
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       alert("Failed to delete user");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const filteredUsers = useMemo(() => {
//     const now = Date.now();
//     const DAY = 1000 * 60 * 60 * 24;

//     return users.filter((u) => {
//       const lastActive = u.lastActive
//         ? new Date(u.lastActive).getTime()
//         : new Date(u.createdAt).getTime();

//       const joined = new Date(u.createdAt).getTime();

//       switch (filter) {
//         case "online":
//           return u.isOnline;
//         case "offline":
//           return !u.isOnline;
//         case "offline_7d":
//           return !u.isOnline && now - lastActive >= DAY * 7;
//         case "offline_30d":
//           return !u.isOnline && now - lastActive >= DAY * 30;
//         case "offline_2m":
//           return !u.isOnline && now - lastActive >= DAY * 60;
//         case "offline_6m":
//           return !u.isOnline && now - lastActive >= DAY * 180;
//         case "offline_1y":
//           return !u.isOnline && now - lastActive >= DAY * 365;
//         case "joined_7d":
//           return now - joined <= DAY * 7;
//         case "joined_30d":
//           return now - joined <= DAY * 30;
//         default:
//           return true;
//       }
//     });
//   }, [users, filter]);

//   if (loading) {
//     return (
//       <div className="py-20 text-center text-slate-500">
//         Loading users…
//       </div>
//     );
//   }

//   return (
//     <div>
//       {/* HEADER */}
//       <div className="flex flex-col gap-4 mb-6">
//         <h1 className="text-2xl font-bold">Users</h1>

//         {/* FILTER BAR */}
//         <div className="flex flex-wrap gap-2">
//           {FILTERS.map((f) => (
//             <button
//               key={f.key}
//               onClick={() => setFilter(f.key)}
//               className={`
//                 px-3 py-1.5 rounded-full text-sm font-medium border transition
//                 ${
//                   filter === f.key
//                     ? "bg-cyan-500 text-white border-cyan-500"
//                     : "bg-white hover:bg-slate-100"
//                 }
//               `}
//             >
//               {f.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white border rounded-xl overflow-x-auto shadow-sm">
//         <table className="min-w-full text-sm">
//           <thead className="bg-slate-100 sticky top-0 z-10">
//             <tr>
//               <th className="px-4 py-3 text-left">User</th>
//               <th className="px-4 py-3 text-left">Status</th>
//               <th className="px-4 py-3 text-left">Joined</th>
//               <th className="px-4 py-3 text-left">Last Login</th>
//               <th className="px-4 py-3 text-left">Last Active</th>
//               <th className="px-4 py-3 text-left">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredUsers.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="6"
//                   className="px-6 py-12 text-center text-slate-500"
//                 >
//                   No users found for this filter
//                 </td>
//               </tr>
//             ) : (
//               filteredUsers.map((u) => (
//                 <tr
//                   key={u._id}
//                   className="border-t hover:bg-slate-50 transition"
//                 >
//                   <td className="px-4 py-3">
//                     <div className="font-semibold">{u.username}</div>
//                     <div className="text-xs text-slate-500">
//                       {u.email}
//                     </div>
//                   </td>

//                   <td className="px-4 py-3">
//                     <span
//                       className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
//                         u.isOnline
//                           ? "bg-green-100 text-green-700"
//                           : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       <CircleDot size={10} />
//                       {u.isOnline ? "Online" : "Offline"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3">
//                     {new Date(u.createdAt).toLocaleDateString()}
//                   </td>

//                   <td className="px-4 py-3">
//                     {u.lastLogin
//                       ? new Date(u.lastLogin).toLocaleString()
//                       : "-"}
//                   </td>

//                   <td className="px-4 py-3">
//                     {u.lastActive
//                       ? new Date(u.lastActive).toLocaleString()
//                       : "-"}
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       disabled={deletingId === u._id}
//                       onClick={() => handleDelete(u._id)}
//                       className="
//                         inline-flex items-center gap-1
//                         px-3 py-1.5 rounded-lg text-xs font-semibold
//                         bg-red-500 text-white hover:bg-red-600
//                         disabled:opacity-50 disabled:cursor-not-allowed
//                       "
//                     >
//                       <Trash2 size={14} />
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Users;

import { useEffect, useState, useMemo } from "react";
import { fetchUsers, deleteUser } from "../services/adminApi";
import { CircleDot, Trash2, Coins, Wallet } from "lucide-react";

const FILTERS = [
  { key: "all", label: "All Users" },
  { key: "online", label: "Online" },
  { key: "offline", label: "Offline" },
  { key: "offline_7d", label: "Offline 7+ Days" },
  { key: "offline_30d", label: "Offline 30+ Days" },
  { key: "offline_2m", label: "Offline 2+ Months" },
  { key: "offline_6m", label: "Offline 6+ Months" },
  { key: "offline_1y", label: "Offline 1+ Year" },
  { key: "joined_7d", label: "Joined Last 7 Days" },
  { key: "joined_30d", label: "Joined Last 30 Days" },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    const interval = setInterval(loadUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this user?"
    );
    if (!confirmed) return;

    try {
      setDeletingId(userId);
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch {
      alert("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUsers = useMemo(() => {
    const now = Date.now();
    const DAY = 1000 * 60 * 60 * 24;

    return users.filter((u) => {
      const lastActive = u.lastActive
        ? new Date(u.lastActive).getTime()
        : new Date(u.createdAt).getTime();

      const joined = new Date(u.createdAt).getTime();

      switch (filter) {
        case "online":
          return u.isOnline;
        case "offline":
          return !u.isOnline;
        case "offline_7d":
          return !u.isOnline && now - lastActive >= DAY * 7;
        case "offline_30d":
          return !u.isOnline && now - lastActive >= DAY * 30;
        case "offline_2m":
          return !u.isOnline && now - lastActive >= DAY * 60;
        case "offline_6m":
          return !u.isOnline && now - lastActive >= DAY * 180;
        case "offline_1y":
          return !u.isOnline && now - lastActive >= DAY * 365;
        case "joined_7d":
          return now - joined <= DAY * 7;
        case "joined_30d":
          return now - joined <= DAY * 30;
        default:
          return true;
      }
    });
  }, [users, filter]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading users…
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold">Users</h1>

        {/* FILTER BAR */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium border transition
                ${
                  filter === f.key
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
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Points</th>
              <th className="px-4 py-3 text-left">Cash</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-left">Last Active</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                  No users found for this filter
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr
                  key={u._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold">{u.username}</div>
                    <div className="text-xs text-slate-500">
                      {u.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        u.isOnline
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <CircleDot size={10} />
                      {u.isOnline ? "Online" : "Offline"}
                    </span>
                  </td>

                  {/* POINTS */}
                  <td className="px-4 py-3 font-semibold text-cyan-600">
                    <div className="flex items-center gap-1">
                      <Coins size={14} />
                      {u.points ?? 0}
                    </div>
                  </td>

                  {/* CASH */}
                  <td className="px-4 py-3 font-semibold text-green-600">
                    <div className="flex items-center gap-1">
                      <Wallet size={14} />
                      ₹{u.balance ?? 0}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">
                    {u.lastActive
                      ? new Date(u.lastActive).toLocaleString()
                      : "-"}
                  </td>

                  <td className="px-4 py-3">
                    <button
                      disabled={deletingId === u._id}
                      onClick={() => handleDelete(u._id)}
                      className="
                        inline-flex items-center gap-1
                        px-3 py-1.5 rounded-lg text-xs font-semibold
                        bg-red-500 text-white hover:bg-red-600
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
