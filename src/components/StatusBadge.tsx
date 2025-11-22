import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface StatusBadgeProps {
  status: 'pending' | 'in-progress' | 'resolved';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useLanguage();

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          text: t('pending'),
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'in-progress':
        return {
          icon: AlertCircle,
          text: t('inProgress'),
          className: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      case 'resolved':
        return {
          icon: CheckCircle,
          text: t('resolved'),
          className: 'bg-green-100 text-green-800 border-green-200'
        };
    }
  };

  const { icon: Icon, text, className } = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      <Icon className="h-3 w-3 mr-1" />
      {text}
    </span>
  );
};

export default StatusBadge;