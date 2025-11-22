import React, { useState } from 'react';
import { Plus, Filter, User, LogOut, Home, FileText, Bell, Search, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useComplaints } from '../contexts/ComplaintContext';
import { useLanguage } from '../hooks/useLanguage';
import IssueForm from './IssueForm';
import IssueCard from './IssueCard';
import LanguageToggle from './LanguageToggle';

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'report' | 'profile'>('home');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  
  const { user, logout } = useAuth();
  const { getComplaintsByUser } = useComplaints();
  const { t } = useLanguage();

  const userComplaints = user ? getComplaintsByUser(user.id) : [];
  const filteredComplaints = statusFilter === 'all' 
    ? userComplaints 
    : userComplaints.filter(complaint => complaint.status === statusFilter);

  const getStatsData = () => {
    const total = userComplaints.length;
    const pending = userComplaints.filter(c => c.status === 'pending').length;
    const inProgress = userComplaints.filter(c => c.status === 'in-progress').length;
    const resolved = userComplaints.filter(c => c.status === 'resolved').length;
    return { total, pending, inProgress, resolved };
  };

  const stats = getStatsData();

  const tabs = [
    { id: 'home', label: t('home'), icon: Home, gradient: 'from-purple-500 to-pink-500' },
    { id: 'report', label: t('reportIssue'), icon: Plus, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'profile', label: t('profile'), icon: User, gradient: 'from-green-500 to-emerald-500' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
                <p className="text-purple-100 text-lg">Track your civic issues and make your community better</p>
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <FileText className="h-6 w-6" />
                    </div>
                    <TrendingUp className="h-5 w-5 text-white/70" />
                  </div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-purple-100">Total Issues</p>
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
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-yellow-100">Pending</p>
                </div>
              </div>

              <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
                  </div>
                  <p className="text-2xl font-bold">{stats.inProgress}</p>
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
                  <p className="text-2xl font-bold">{stats.resolved}</p>
                  <p className="text-green-100">Resolved</p>
                </div>
              </div>
            </div>

            {/* Issues Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Issues</h3>
                    <p className="text-gray-600">Track and manage your reported civic issues</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search issues..."
                        className="pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-5 w-5 text-gray-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="px-4 py-2 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                      >
                        <option value="all">All Issues</option>
                        <option value="pending">{t('pending')}</option>
                        <option value="in-progress">{t('inProgress')}</option>
                        <option value="resolved">{t('resolved')}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {filteredComplaints.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText className="h-12 w-12 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No issues found</h3>
                    <p className="text-gray-600 mb-8">
                      {statusFilter === 'all' 
                        ? 'Start by reporting your first issue to make your community better' 
                        : `No ${statusFilter} issues found`}
                    </p>
                    <button
                      onClick={() => setActiveTab('report')}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      {t('reportIssue')}
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredComplaints.map(complaint => (
                      <div key={complaint.id} className="transform hover:scale-[1.02] transition-all duration-300">
                        <IssueCard complaint={complaint} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'report':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('reportIssue')}</h2>
              <p className="text-xl text-gray-600">Help make your community better by reporting civic issues</p>
            </div>
            <IssueForm />
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('profile')}</h2>
              <p className="text-gray-600">Manage your account information</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-transparent group-hover:border-green-200 transition-all">
                      <p className="text-lg font-medium text-gray-900">{user?.name}</p>
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">{t('phoneNumber')}</label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-transparent group-hover:border-green-200 transition-all">
                      <p className="text-lg font-medium text-gray-900">{user?.phoneNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">{t('district')}</label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-transparent group-hover:border-green-200 transition-all">
                      <p className="text-lg font-medium text-gray-900">{user?.district}</p>
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">{t('block')}</label>
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-transparent group-hover:border-green-200 transition-all">
                      <p className="text-lg font-medium text-gray-900">{user?.block}</p>
                    </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CivicConnect
                </h1>
                <p className="text-sm text-gray-600">Citizen Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 hover:text-purple-600 cursor-pointer transition-colors" />
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

export default UserDashboard;