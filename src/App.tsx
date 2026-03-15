import { Routes, Route } from "react-router-dom";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/ui/Navbar";
import ToastProvider from "./components/ui/ToastProvider";
import TrendAnalysis from "./pages/TrendAnalysis";

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-earth-50">
        <Navbar />
        <main className="pb-10">
          <Routes>
            <Route path="/" element={<FarmerDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/trend/:cropId" element={<TrendAnalysis />} />
          </Routes>
        </main>
      </div>
    </ToastProvider>
  );
}
