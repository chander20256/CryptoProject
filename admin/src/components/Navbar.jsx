import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="text-sm font-semibold text-red-500 hover:text-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
