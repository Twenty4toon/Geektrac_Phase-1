import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardHome } from "@/pages/DashboardHome";
import MapModule from "@/pages/MapModule";
import VehiclesModule from "@/pages/VehiclesModule";
import { DriversModule } from "@/pages/DriversModule";
import FuelModule from "@/pages/FuelModule";
import MaintenanceModule from "@/pages/MaintenanceModule";
import AlertsModule from "@/pages/AlertsModule";
import JobsModule from "@/pages/JobsModule";
import ReportsModule from "@/pages/ReportsModule";
import SettingsModule from "@/pages/SettingsModule";
import MobilePreview from "@/pages/MobilePreview";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="map" element={<MapModule />} />
          <Route path="vehicles" element={<VehiclesModule />} />
          <Route path="drivers" element={<DriversModule />} />
          <Route path="trips" element={<div className="text-white p-8">Trips Module (Day 4)</div>} />
          <Route path="fuel" element={<FuelModule />} />
          <Route path="alerts" element={<AlertsModule />} />
          <Route path="maintenance" element={<MaintenanceModule />} />
          <Route path="jobs" element={<JobsModule />} />
          <Route path="reports" element={<ReportsModule />} />
          <Route path="settings" element={<SettingsModule />} />
          <Route path="mobile-preview" element={<MobilePreview />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
