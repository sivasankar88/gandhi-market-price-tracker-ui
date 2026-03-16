import { Routes, Route } from "react-router-dom";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/ui/Navbar";
import ToastProvider from "./components/ui/ToastProvider";
import TrendAnalysis from "./pages/TrendAnalysis";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-earth-50">
        <Navbar />
        <main className="pb-10">
          <Routes>
            <Route path="/" element={<FarmerDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/trend/:cropId" element={<TrendAnalysis />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </ToastProvider>
  );
}
