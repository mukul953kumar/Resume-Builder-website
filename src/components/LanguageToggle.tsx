import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'हिं' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;