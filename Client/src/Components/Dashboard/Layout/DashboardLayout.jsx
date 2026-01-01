// import React, { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import DashboardNavbar from "../Dashboardglobalcomp/DashboardNavbar";
// import DashboardSidebar from "../Dashboardglobalcomp/DashboardSidebar";

// const DashboardLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   // USER LOGOUT ON TAB CLOSE
//   useEffect(() => {
//     const handleUnload = () => {
//       const userId = localStorage.getItem("userId");
//       if (!userId) return;

//       navigator.sendBeacon(
//         "/api/user/logout",
//         JSON.stringify({ userId })
//       );
//     };

//     window.addEventListener("beforeunload", handleUnload);
//     return () => window.removeEventListener("beforeunload", handleUnload);
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
//       <DashboardSidebar
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//       />

//       {mobileOpen && (
//         <div
//           className="fixed inset-0 z-40 lg:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       <div className={`${collapsed ? "lg:ml-20" : "lg:ml-48"} transition-all`}>
//         <DashboardNavbar
//           collapsed={collapsed}
//           setMobileOpen={setMobileOpen}
//         />

//         <main className="pt-20 px-4 sm:px-6 lg:px-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;


import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../Dashboardglobalcomp/DashboardNavbar";
import DashboardSidebar from "../Dashboardglobalcomp/DashboardSidebar";
import { WalletProvider } from "../../context/WalletContext";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // MARK USER OFFLINE ON TAB CLOSE
  useEffect(() => {
    const handleUnload = () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      navigator.sendBeacon(
        "/api/user/logout",
        JSON.stringify({ userId })
      );
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  return (
    <WalletProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* SIDEBAR */}
        <DashboardSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* ✅ MOBILE OVERLAY (FIXED LOCATION) */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* CONTENT */}
        <div
          className={`
            transition-all
            ${collapsed ? "lg:ml-20" : "lg:ml-48"}
          `}
        >
          <DashboardNavbar
            collapsed={collapsed}
            setMobileOpen={setMobileOpen}
          />

          <main className="pt-20 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </WalletProvider>
  );
};

export default DashboardLayout;
