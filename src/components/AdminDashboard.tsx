import React, { useState } from 'react';
import { Shield, LogOut, Home, Users, BarChart3, Settings, Filter, Bell, Search, TrendingUp, Clock, CheckCircle2, AlertTriangle, Eye, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useComplaints } from '../contexts/ComplaintContext';
import { useLanguage } from '../hooks/useLanguage';
import IssueCard from './IssueCard';
import StatusBadge from './StatusBadge';
import LanguageToggle from './LanguageToggle';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'complaints' | 'analytics'>('dashboard');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');

  const { admin, logout } = useAuth();
  const { getComplaintsByAdmin, updateComplaintStatus } = useComplaints();
  const { t } = useLanguage();

  const adminComplaints = admin 
    ? getComplaintsByAdmin(admin.id, admin.role, admin.district, admin.block, admin.category)
    : [];

  const filteredComplaints = statusFilter === 'all' 
    ? adminComplaints 
    : adminComplaints.filter(complaint => complaint.status === statusFilter);

  const getStatsData = () => {
    const total = adminComplaints.length;
    const pending = adminComplaints.filter(c => c.status === 'pending').length;
    const inProgress = adminComplaints.filter(c => c.status === 'in-progress').length;
    const resolved = adminComplaints.filter(c => c.status === 'resolved').length;

    return { total, pending, inProgress, resolved };
  };

  const handleStatusUpdate = (complaintId: string, newStatus: 'pending' | 'in-progress' | 'resolved') => {
    updateComplaintStatus(complaintId, newStatus, resolutionNote || undefined);
    setSelectedComplaint(null);
    setResolutionNote('');
  };

  const getRoleTitle = () => {
    switch (admin?.role) {
      case 'category': return `Category Admin - ${admin.category}`;
      case 'block': return `Block Admin - ${admin.block}`;
      case 'district': return `District Admin - ${admin.district}`;
      case 'super': return 'Super Administrator';
      default: return 'Administrator';
    }
  };

  const getRoleGradient = () => {
    switch (admin?.role) {
      case 'category': return 'from-purple-500 to-pink-500';
      case 'block': return 'from-blue-500 to-cyan-500';
      case 'district': return 'from-green-500 to-emerald-500';
      case 'super': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, gradient: 'from-purple-500 to-pink-500' },
    { id: 'complaints', label: 'Complaints', icon: Users, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, gradient: 'from-green-500 to-emerald-500' },
  ];

  const stats = getStatsData();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${getRoleGradient()} rounded-3xl p-8 text-white`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Welcome, {admin?.name}! 🛡️</h2>
                <p className="text-white/90 text-lg">{getRoleTitle()}</p>
                <p className="text-white/80 mt-2">Manage and resolve civic issues efficiently</p>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Users className="h-6 w-6" />
                    </div>
                    <TrendingUp className="h-5 w-5 text-white/70" />
                  </div>
                  <p className="text-3xl font-bold">{stats.total}</p>
                  <p className="text-indigo-100">Total Complaints</p>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                  <p className="text-yellow-100">Pending</p>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
                  </div>
                  <p className="text-3xl font-bold">{stats.inProgress}</p>
                  <p className="text-blue-100">In Progress</p>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  </div>
                  <p className="text-3xl font-bold">{stats.resolved}</p>
                  <p className="text-green-100">Resolved</p>
                </div>
              </div>
            </div>

            {/* Recent Complaints */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Recent Complaints</h3>
                  <p className="text-gray-600">Latest issues requiring your attention</p>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105">
                  <Eye className="h-4 w-4" />
                  <span>View All</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {adminComplaints.slice(0, 5).map(complaint => (
                  <div key={complaint.id} className="group p-6 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900 capitalize text-lg">{complaint.category}</h4>
                          <StatusBadge status={complaint.status} />
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">{complaint.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{complaint.district}, {complaint.block}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6">
                        <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all group-hover:bg-gray-100">
                          <Eye className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'complaints':
        return (
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Manage Complaints</h2>
                  <p className="text-gray-600">Review, update, and resolve civic issues</p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search complaints..."
                      className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="px-4 py-2 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    >
                      <option value="all">All Complaints</option>
                      <option value="pending">{t('pending')}</option>
                      <option value="in-progress">{t('inProgress')}</option>
                      <option value="resolved">{t('resolved')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {filteredComplaints.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-12 w-12 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No complaints found</h3>
                  <p className="text-gray-600">
                    {statusFilter === 'all' 
                      ? 'No complaints have been assigned to you yet' 
                      : `No ${statusFilter} complaints found`}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredComplaints.map(complaint => (
                    <div key={complaint.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <div className="p-6">
                        <IssueCard complaint={complaint} showUserInfo />
                        
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-3">
                              {complaint.status === 'pending' && (
                                <button
                                  onClick={() => handleStatusUpdate(complaint.id, 'in-progress')}
                                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                  Start Progress
                                </button>
                              )}
                              {complaint.status === 'in-progress' && (
                                <button
                                  onClick={() => setSelectedComplaint(complaint.id)}
                                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                  Mark Resolved
                                </button>
                              )}
                            </div>
                          </div>

                          {selectedComplaint === complaint.id && (
                            <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Resolution Details</h4>
                              <textarea
                                value={resolutionNote}
                                onChange={(e) => setResolutionNote(e.target.value)}
                                placeholder="Enter detailed resolution notes..."
                                rows={4}
                                className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                              />
                              <div className="flex space-x-3 mt-4">
                                <button
                                  onClick={() => handleStatusUpdate(complaint.id, 'resolved')}
                                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                                >
                                  Confirm Resolution
                                </button>
                                <button
                                  onClick={() => setSelectedComplaint(null)}
                                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all duration-300"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h2>
              <p className="text-xl text-gray-600">Insights and performance metrics</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Status Distribution</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Pending</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-40 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-1000" 
                          style={{ width: `${stats.total ? (stats.pending / stats.total) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-gray-900 w-8">{stats.pending}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">In Progress</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-40 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-indigo-400 h-3 rounded-full transition-all duration-1000" 
                          style={{ width: `${stats.total ? (stats.inProgress / stats.total) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-gray-900 w-8">{stats.inProgress}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Resolved</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-40 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-emerald-400 h-3 rounded-full transition-all duration-1000" 
                          style={{ width: `${stats.total ? (stats.resolved / stats.total) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-gray-900 w-8">{stats.resolved}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                    <span className="text-gray-700 font-medium">Resolution Rate</span>
                    <span className="text-2xl font-bold text-green-600">
                      {stats.total ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                    <span className="text-gray-700 font-medium">Active Cases</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {stats.pending + stats.inProgress}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                    <span className="text-gray-700 font-medium">Total Handled</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {stats.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className={`h-12 w-12 bg-gradient-to-br ${getRoleGradient()} rounded-2xl flex items-center justify-center shadow-lg`}>
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  CivicConnect Admin
                </h1>
                <p className="text-sm text-gray-600">{getRoleTitle()}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 hover:text-indigo-600 cursor-pointer transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <LanguageToggle />
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-6 sticky top-32">
              <nav className="space-y-3">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full group relative overflow-hidden rounded-2xl p-4 text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg transform scale-105`
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-xl ${
                        activeTab === tab.id 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : 'bg-gray-100 group-hover:bg-gray-200'
                      } transition-all`}>
                        <tab.icon className="h-5 w-5" />
                      </div>
                      <span className="font-semibold">{tab.label}</span>
                    </div>
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;