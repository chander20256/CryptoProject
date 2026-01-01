import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAdminAuth } from "./context/AdminAuthContext";

import AdminRoutes from "./routes/AdminRoutes";
import AdminLayout from "./layout/AdminLayout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Deposits from "./pages/Deposits";
import Withdraws from "./pages/Withdraws";

const App = () => {
  const { isAuthenticated } = useAdminAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          }
        />

        <Route element={<AdminRoutes />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
<Route path="/users" element={<Users />} />
<Route path="/deposits" element={<Deposits />} />
<Route path="/withdraws" element={<Withdraws />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
