import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Deposit from "./Pages/Dashboard/Deposit";
import Withdraw from "./Pages/Dashboard/Withdraw"; // ✅ ADD

import ProtectedRoute from "./Routes/ProtectedRoute";
import DashboardLayout from "./Components/Dashboard/Layout/DashboardLayout";
import RewardsPage from "./Pages/Dashboard/Reward";
import GamesSection from "./Components/Dashboard/Games/GameSection";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      {/* PROTECTED DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        {/* WALLET */}
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdraw" element={<Withdraw />} /> {/* ✅ ADD */}
        <Route path="rewards" element={<RewardsPage />} /> {/* ✅ ADD */}
        <Route path="games" element={<GamesSection />} /> {/* ✅ ADD */}
      </Route>
    </Routes>
  );
}

export default App;
