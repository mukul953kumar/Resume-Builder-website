import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ComplaintProvider } from './contexts/ComplaintContext';
import LandingPage from './components/LandingPage';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { User, Shield } from 'lucide-react';

const AuthenticatedApp: React.FC = () => {
  const { isAuthenticated, userType } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [showAuthSelector, setShowAuthSelector] = useState(false);

  if (showLanding && !isAuthenticated) {
    return <LandingPage onGetStarted={() => {
      setShowLanding(false);
      setShowAuthSelector(true);
    }} />;
  }

  if (!isAuthenticated && showAuthSelector) {
    return <AuthSelector />;
  }

  if (!isAuthenticated) {
    return <LandingPage onGetStarted={() => {
      setShowLanding(false);
      setShowAuthSelector(true);
    }} />;
  }

  if (userType === 'user') {
    return <UserDashboard />;
  }

  if (userType === 'admin') {
    return <AdminDashboard />;
  }

  return <LandingPage onGetStarted={() => {
    setShowLanding(false);
    setShowAuthSelector(true);
  }} />;
};

const AuthSelector: React.FC = () => {
  const [selectedAuth, setSelectedAuth] = useState<'user' | 'admin' | null>(null);

  if (selectedAuth === 'user') {
    return <UserLogin />;
  }

  if (selectedAuth === 'admin') {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Portal
          </h1>
          <p className="text-xl text-gray-300">
            Select how you'd like to access CivicConnect
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* User Login Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-white/20 hover:border-purple-400 transform hover:-translate-y-2">
            <div 
              className="text-center"
              onClick={() => setSelectedAuth('user')}
            >
              <div className="mx-auto h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Citizen Portal
              </h3>
              <p className="text-gray-300 mb-6">
                Report civic issues in your area and track their resolution status
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Report Issues
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Track Status
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  Upload Photos
                </div>
              </div>
              <button className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                Continue as Citizen
              </button>
            </div>
          </div>

          {/* Admin Login Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-white/20 hover:border-blue-400 transform hover:-translate-y-2">
            <div 
              className="text-center"
              onClick={() => setSelectedAuth('admin')}
            >
              <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Admin Portal
              </h3>
              <p className="text-gray-300 mb-6">
                Manage and resolve civic issues with administrative tools
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Manage Complaints
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Update Status
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  Analytics Dashboard
                </div>
              </div>
              <button className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                Continue as Admin
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Need help? Contact support at support@civicconnect.gov.in
          </p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ComplaintProvider>
        <AuthenticatedApp />
      </ComplaintProvider>
    </AuthProvider>
  );
};

export default App;