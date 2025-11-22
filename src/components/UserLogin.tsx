import React, { useState } from 'react';
import { Phone, MapPin, Building2, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../hooks/useLanguage';
import { districts } from '../data/mockData';
import LanguageToggle from './LanguageToggle';

const UserLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    district: '',
    block: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginUser } = useAuth();
  const { t } = useLanguage();

  const selectedDistrictData = districts.find(d => d.name === formData.district);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phoneNumber || !formData.district || !formData.block) {
      setError(t('fillAllFields'));
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      setError('Phone number must be 10 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await loginUser(formData.phoneNumber, formData.district, formData.block);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-white">
            CivicConnect
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Report and track civic issues in your area
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-white">{t('login')}</h3>
            <LanguageToggle />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                {t('phoneNumber')} *
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                placeholder="Enter 10-digit mobile number"
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                maxLength={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <MapPin className="h-4 w-4 inline mr-2" />
                {t('district')} *
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value, block: ''})}
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              >
                <option value="">{t('selectDistrict')}</option>
                {districts.map(district => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Building2 className="h-4 w-4 inline mr-2" />
                {t('block')} *
              </label>
              <select
                value={formData.block}
                onChange={(e) => setFormData({...formData, block: e.target.value})}
                disabled={!selectedDistrictData}
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white disabled:bg-white/5 disabled:text-gray-400"
              >
                <option value="">{t('selectBlock')}</option>
                {selectedDistrictData?.blocks.map(block => (
                  <option key={block.id} value={block.name}>
                    {block.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? t('loading') : t('login')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;