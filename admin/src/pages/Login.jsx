import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginNavbar from "../components/LoginNavbar";
import { useAdminAuth } from "../context/AdminAuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(password);

    if (success) {
      navigate("/", { replace: true });
    } else {
      setError("Invalid admin password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <LoginNavbar />

      <div className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg border p-8">
          <h2 className="text-2xl font-bold mb-1">Admin Login</h2>
          <p className="text-sm text-slate-500 mb-6">
            Enter admin password to continue
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* PASSWORD ONLY */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="
                  w-full rounded-lg border border-slate-300
                  px-3 py-2 text-sm
                  focus:outline-none focus:ring-2 focus:ring-cyan-500
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="
                w-full bg-cyan-500 text-white
                py-2.5 rounded-lg font-semibold text-sm
                hover:bg-cyan-600 transition
              "
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Crypto Project. Admin access only.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
