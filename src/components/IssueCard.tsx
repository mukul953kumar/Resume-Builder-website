import React from 'react';
import { MapPin, Calendar, User, Image as ImageIcon } from 'lucide-react';
import { Complaint } from '../types';
import StatusBadge from './StatusBadge';

interface IssueCardProps {
  complaint: Complaint;
  showUserInfo?: boolean;
}

const IssueCard: React.FC<IssueCardProps> = ({ complaint, showUserInfo = false }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-white/30 p-6 hover:shadow-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 capitalize">
              {complaint.category}
            </h3>
            <StatusBadge status={complaint.status} />
          </div>
          
          <div className="flex items-center text-sm text-gray-600 space-x-4 mb-3">
            <div className="flex items-center">
              <div className="p-1 bg-gray-100 rounded-lg mr-2">
                <MapPin className="h-3 w-3" />
              </div>
              <span>{complaint.district}, {complaint.block}</span>
            </div>
            <div className="flex items-center">
              <div className="p-1 bg-gray-100 rounded-lg mr-2">
                <Calendar className="h-3 w-3" />
              </div>
              <span>{formatDate(complaint.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4">
        {complaint.description}
      </p>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <div className="p-1 bg-blue-100 rounded-lg mr-2">
              <MapPin className="h-3 w-3 text-blue-600" />
            </div>
            <span>{complaint.location.address}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {complaint.image && (
              <div className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                <ImageIcon className="h-3 w-3 mr-1" />
                <span>Photo attached</span>
              </div>
            )}
          </div>
        </div>

        {complaint.status === 'resolved' && complaint.resolutionNote && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <h4 className="text-sm font-semibold text-green-800 mb-2">Resolution Note:</h4>
            <p className="text-sm text-green-700">{complaint.resolutionNote}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueCard;