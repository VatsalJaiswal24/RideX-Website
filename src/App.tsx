
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Role-specific dashboards
import RiderDashboard from "./pages/rider/Dashboard";
import DriverDashboard from "./pages/driver/Dashboard";
import StaffDashboard from "./pages/staff/Dashboard";

// Rider pages
import BookRide from "./pages/rider/BookRide";
import RideHistory from "./pages/rider/RideHistory";
import Payment from "./pages/rider/Payment";

// Driver pages
import ManageRides from "./pages/driver/ManageRides";
import Earnings from "./pages/driver/Earnings";

// Staff pages
import UserManagement from "./pages/staff/UserManagement";
import RideManagement from "./pages/staff/RideManagement";
import Analytics from "./pages/staff/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rider Routes */}
            <Route 
              path="/rider" 
              element={
                <ProtectedRoute role="rider">
                  <RiderDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/rider/book" 
              element={
                <ProtectedRoute role="rider">
                  <BookRide />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/rider/history" 
              element={
                <ProtectedRoute role="rider">
                  <RideHistory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/rider/payment" 
              element={
                <ProtectedRoute role="rider">
                  <Payment />
                </ProtectedRoute>
              } 
            />
            
            {/* Driver Routes */}
            <Route 
              path="/driver" 
              element={
                <ProtectedRoute role="driver">
                  <DriverDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/driver/rides" 
              element={
                <ProtectedRoute role="driver">
                  <ManageRides />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/driver/earnings" 
              element={
                <ProtectedRoute role="driver">
                  <Earnings />
                </ProtectedRoute>
              } 
            />
            
            {/* Staff Routes */}
            <Route 
              path="/staff" 
              element={
                <ProtectedRoute role="staff">
                  <StaffDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/users" 
              element={
                <ProtectedRoute role="staff">
                  <UserManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/rides" 
              element={
                <ProtectedRoute role="staff">
                  <RideManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/analytics" 
              element={
                <ProtectedRoute role="staff">
                  <Analytics />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
