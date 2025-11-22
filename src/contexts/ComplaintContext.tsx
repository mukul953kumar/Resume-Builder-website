import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Complaint } from '../types';
import { mockComplaints } from '../data/mockData';

interface ComplaintContextType {
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateComplaintStatus: (id: string, status: Complaint['status'], resolutionNote?: string, resolutionImage?: string) => void;
  getComplaintsByUser: (userId: string) => Complaint[];
  getComplaintsByAdmin: (adminId: string, role: string, district?: string, block?: string, category?: string) => Complaint[];
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined);

export const useComplaints = () => {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
};

interface ComplaintProviderProps {
  children: ReactNode;
}

export const ComplaintProvider: React.FC<ComplaintProviderProps> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);

  const addComplaint = (complaintData: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newComplaint: Complaint = {
      ...complaintData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending',
    };

    setComplaints(prev => [newComplaint, ...prev]);
  };

  const updateComplaintStatus = (id: string, status: Complaint['status'], resolutionNote?: string, resolutionImage?: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { 
            ...complaint, 
            status, 
            updatedAt: new Date().toISOString(),
            resolutionNote,
            resolutionImage
          }
        : complaint
    ));
  };

  const getComplaintsByUser = (userId: string): Complaint[] => {
    return complaints.filter(complaint => complaint.userId === userId);
  };

  const getComplaintsByAdmin = (adminId: string, role: string, district?: string, block?: string, category?: string): Complaint[] => {
    return complaints.filter(complaint => {
      switch (role) {
        case 'category':
          return complaint.category === category && complaint.district === district && complaint.block === block;
        case 'block':
          return complaint.district === district && complaint.block === block;
        case 'district':
          return complaint.district === district;
        case 'super':
          return true;
        default:
          return false;
      }
    });
  };

  return (
    <ComplaintContext.Provider value={{
      complaints,
      addComplaint,
      updateComplaintStatus,
      getComplaintsByUser,
      getComplaintsByAdmin,
    }}>
      {children}
    </ComplaintContext.Provider>
  );
};