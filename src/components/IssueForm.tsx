import React, { useState } from 'react';
import { MapPin, Camera, Navigation, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useComplaints } from '../contexts/ComplaintContext';
import { useLanguage } from '../hooks/useLanguage';
import { categories } from '../data/mockData';

const IssueForm: React.FC = () => {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    location: {
      type: 'manual' as 'manual' | 'gps',
      address: '',
      coordinates: undefined as { lat: number; lng: number } | undefined
    },
    image: null as File | null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user } = useAuth();
  const { addComplaint } = useComplaints();
  const { t, language } = useLanguage();

  const handleLocationToggle = (type: 'manual' | 'gps') => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        type,
        address: type === 'gps' ? prev.location.address : '',
        coordinates: type === 'gps' ? prev.location.coordinates : undefined
      }
    }));

    if (type === 'gps') {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              coordinates: { lat: latitude, lng: longitude },
              address: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please use manual location input.');
          setFormData(prev => ({
            ...prev,
            location: { ...prev.location, type: 'manual' }
          }));
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, type: 'manual' }
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.description || !formData.location.address) {
      alert(t('fillAllFields'));
      return;
    }

    if (!user) {
      alert('User not found. Please login again.');
      return;
    }

    setLoading(true);
    
    try {
      addComplaint({
        userId: user.id,
        district: user.district,
        block: user.block,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        image: formData.image ? URL.createObjectURL(formData.image) : undefined,
        status: 'pending'
      });

      setSuccess(true);
      setFormData({
        category: '',
        description: '',
        location: {
          type: 'manual',
          address: '',
          coordinates: undefined
        },
        image: null
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 text-2xl mb-4">✅</div>
        <h3 className="text-lg font-medium text-green-800 mb-2">
          {t('issueSubmitted')}
        </h3>
        <p className="text-green-700">
          Your complaint has been submitted and will be reviewed by the appropriate authority.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t('category')} *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
          >
            <option value="">{t('selectCategory')}</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>
                {language === 'hi' ? category.nameHi : category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t('problemDescription')} *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            placeholder="Describe the issue in detail..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t('location')} *
          </label>
          
          <div className="flex space-x-3 mb-4">
            <button
              type="button"
              onClick={() => handleLocationToggle('manual')}
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                formData.location.type === 'manual'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MapPin className="h-4 w-4 mr-2" />
              {t('manualLocation')}
            </button>
            <button
              type="button"
              onClick={() => handleLocationToggle('gps')}
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                formData.location.type === 'gps'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Navigation className="h-4 w-4 mr-2" />
              {t('useGPS')}
            </button>
          </div>

          <input
            type="text"
            value={formData.location.address}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              location: { ...prev.location, address: e.target.value }
            }))}
            placeholder={
              formData.location.type === 'manual' 
                ? "Enter the location address" 
                : "GPS location will be filled automatically"
            }
            disabled={formData.location.type === 'gps'}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {t('uploadImage')} (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50/50 hover:bg-gray-100/50 transition-all">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              {formData.image ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Camera className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-green-700 font-medium">Image selected: {formData.image.name}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="p-3 bg-gray-200 rounded-xl">
                    <Upload className="h-6 w-6 text-gray-500" />
                  </div>
                  <span className="text-gray-600 font-medium">Click to upload image</span>
                  <span className="text-sm text-gray-500">PNG, JPG up to 10MB</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? t('loading') : t('submit')}
        </button>
      </form>
    </div>
  );
};

export default IssueForm;