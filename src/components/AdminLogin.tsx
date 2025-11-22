import React, { useState } from 'react';
import { Shield, User, MapPin, Building2, Key } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { districts } from '../data/mockData';
import LanguageToggle from './LanguageToggle';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    role: '',
    district: '',
    block: '',
    secretPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginAdmin } = useAuth();
  const { t } = useLanguage();

  const roles = [
    { value: 'category', label: 'Category Admin' },
    { value: 'block', label: 'Block Admin' },
    { value: 'district', label: 'District Admin' },
    { value: 'super', label: 'Super Admin' },
  ];

  const selectedDistrictData = districts.find(d => d.name === formData.district);
  const showDistrictField = ['category', 'block', 'district'].includes(formData.role);
  const showBlockField = ['category', 'block'].includes(formData.role);
  const showPasswordField = formData.role === 'super';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.role) {
      setError(t('fillAllFields'));
      return;
    }

    if (showDistrictField && !formData.district) {
      setError('Please select a district');
      return;
    }

    if (showBlockField && !formData.block) {
      setError('Please select a block');
      return;
    }

    if (showPasswordField && !formData.secretPassword) {
      setError('Secret password is required for Super Admin');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await loginAdmin(
        formData.username,
        formData.role,
        formData.district || undefined,
        formData.block || undefined,
        formData.secretPassword || undefined
      );
      
      if (!success) {
        setError(t('invalidCredentials'));
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">
            CivicConnect Admin
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Manage and resolve civic issues
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">{t('adminLogin')}</h3>
            <LanguageToggle />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                {t('username')} *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Enter admin username"
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Shield className="h-4 w-4 inline mr-2" />
                {t('role')} *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value, district: '', block: ''})}
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="">{t('selectRole')}</option>
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {showDistrictField && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  {t('district')} *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({...formData, district: e.target.value, block: ''})}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                >
                  <option value="">{t('selectDistrict')}</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showBlockField && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Building2 className="h-4 w-4 inline mr-2" />
                  {t('block')} *
                </label>
                <select
                  value={formData.block}
                  onChange={(e) => setFormData({...formData, block: e.target.value})}
                  disabled={!selectedDistrictData}
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white disabled:bg-white/5 disabled:text-gray-400"
                >
                  <option value="">{t('selectBlock')}</option>
                  {selectedDistrictData?.blocks.map(block => (
                    <option key={block.id} value={block.name}>
                      {block.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showPasswordField && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Key className="h-4 w-4 inline mr-2" />
                  {t('secretPassword')} *
                </label>
                <input
                  type="password"
                  value={formData.secretPassword}
                  onChange={(e) => setFormData({...formData, secretPassword: e.target.value})}
                  placeholder="Enter secret password"
                  className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <p className="text-xs text-gray-400 mt-1">Demo password: admin123</p>
              </div>
            )}

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? t('loading') : t('login')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;