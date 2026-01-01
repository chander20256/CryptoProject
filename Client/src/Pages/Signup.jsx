

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Global/Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      /* ✅ STORE AUTH + USER DATA (THIS FIXES NAVBAR ISSUE) */
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);

      navigate("/dashboard", { replace: true });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen pt-16 flex items-center justify-center bg-white dark:bg-slate-950 transition-colors">
        <div className="w-full max-w-md px-6">
          <div className="rounded-2xl p-8 shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {/* HEADER */}
            <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-8">
              Start playing games with real rewards
            </p>

            {/* FORM */}
            <form className="space-y-5" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="
                  w-full h-12 px-4 rounded-lg
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-300 dark:border-slate-700
                  focus:ring-2 focus:ring-cyan-500 outline-none
                "
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full h-12 px-4 rounded-lg
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-300 dark:border-slate-700
                  focus:ring-2 focus:ring-cyan-500 outline-none
                "
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full h-12 px-4 rounded-lg
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-300 dark:border-slate-700
                  focus:ring-2 focus:ring-cyan-500 outline-none
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full h-12 rounded-lg font-semibold
                  bg-cyan-500 hover:bg-cyan-600
                  text-white
                  shadow-lg shadow-cyan-500/30
                  transition
                  disabled:opacity-60
                "
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            {/* FOOTER */}
            <p className="mt-6 text-sm text-center text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-cyan-500 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
