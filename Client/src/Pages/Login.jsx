// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../Components/Global/Navbar";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       // ✅ Store token
//       localStorage.setItem("token", data.token);

//       // ✅ Optional (for dashboard navbar)
//       if (data.user?.username) {
//         localStorage.setItem("username", data.user.username);
//       }

//       // ✅ Redirect to dashboard
//       navigate("/dashboard");
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       alert("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <section
//         className="
//           min-h-screen pt-16 flex items-center justify-center
//           bg-white dark:bg-slate-950
//           transition-colors
//         "
//       >
//         <div className="w-full max-w-md px-6">
//           <div
//             className="
//               rounded-2xl p-8 shadow-xl
//               bg-white dark:bg-slate-900
//               border border-slate-200 dark:border-slate-800
//             "
//           >
//             {/* Header */}
//             <h1 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
//               Welcome Back
//             </h1>
//             <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-8">
//               Login to continue playing
//             </p>

//             {/* Form */}
//             <form className="space-y-5" onSubmit={handleLogin}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="
//                   w-full h-12 px-4 rounded-lg
//                   bg-slate-100 dark:bg-slate-800
//                   border border-slate-300 dark:border-slate-700
//                   text-slate-900 dark:text-white
//                   placeholder-slate-500
//                   focus:outline-none
//                   focus:ring-2 focus:ring-cyan-500
//                   transition
//                 "
//               />

//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="
//                   w-full h-12 px-4 rounded-lg
//                   bg-slate-100 dark:bg-slate-800
//                   border border-slate-300 dark:border-slate-700
//                   text-slate-900 dark:text-white
//                   placeholder-slate-500
//                   focus:outline-none
//                   focus:ring-2 focus:ring-cyan-500
//                   transition
//                 "
//               />

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="
//                   w-full h-12 rounded-lg font-semibold
//                   bg-cyan-500 hover:bg-cyan-600
//                   text-white
//                   shadow-lg shadow-cyan-500/30
//                   transition
//                   disabled:opacity-60
//                 "
//               >
//                 {loading ? "Logging in..." : "Login"}
//               </button>
//             </form>

//             {/* Footer */}
//             <p className="mt-6 text-sm text-center text-slate-600 dark:text-slate-400">
//               Don’t have an account?{" "}
//               <Link
//                 to="/register"
//                 className="font-medium text-cyan-500 hover:underline"
//               >
//                 Sign Up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Global/Navbar";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ STORE AUTH DATA (VERY IMPORTANT)
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id); // 🔥 REQUIRED
      localStorage.setItem("username", data.user.username);

      // ✅ Redirect to dashboard
      navigate("/dashboard", { replace: true });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen pt-16 flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="w-full max-w-md px-6">
          <div className="rounded-2xl p-8 shadow-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ">
            <h1 className="text-3xl font-bold text-center mb-2">
              Welcome Back
            </h1>

            <p className="text-sm text-center mb-8 text-slate-600 dark:text-slate-400 ">
              Login to continue playing
            </p>

            <form className="space-y-5" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-4 rounded-lg
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-300 dark:border-slate-700
                  focus:ring-2 focus:ring-cyan-500
                "
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg
                  bg-slate-100 dark:bg-slate-800
                  border border-slate-300 dark:border-slate-700
                  focus:ring-2 focus:ring-cyan-500
                "
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-lg bg-cyan-500 text-white font-semibold"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-sm text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-cyan-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
