import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/Toaster';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import Onboarding from './pages/auth/Onboarding';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Leads from './pages/dashboard/Leads';
import Pipeline from './pages/dashboard/Pipeline';
import Calendar from './pages/dashboard/Calendar';
import Tasks from './pages/dashboard/Tasks';
import Emails from './pages/dashboard/Emails';
import Workflows from './pages/dashboard/Workflows';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';
import ContactProfile from './pages/dashboard/ContactProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="leads/:id" element={<ContactProfile />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="emails" element={<Emails />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
