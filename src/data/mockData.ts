import { District, Category, Complaint, User, Admin } from '../types';

export const districts: District[] = [
  {
    id: '1',
    name: 'Mumbai',
    blocks: [
      { id: '1', name: 'Block A', categories: [] },
      { id: '2', name: 'Block B', categories: [] },
      { id: '3', name: 'Block C', categories: [] },
    ]
  },
  {
    id: '2',
    name: 'Pune',
    blocks: [
      { id: '4', name: 'Block A', categories: [] },
      { id: '5', name: 'Block B', categories: [] },
    ]
  },
  {
    id: '3',
    name: 'Nashik',
    blocks: [
      { id: '6', name: 'Block A', categories: [] },
      { id: '7', name: 'Block B', categories: [] },
    ]
  },
];

export const categories: Category[] = [
  { id: '1', name: 'Pothole', nameHi: 'गड्ढा' },
  { id: '2', name: 'Streetlight', nameHi: 'स्ट्रीट लाइट' },
  { id: '3', name: 'Water Supply', nameHi: 'पानी की आपूर्ति' },
  { id: '4', name: 'Garbage Collection', nameHi: 'कचरा संग्रह' },
  { id: '5', name: 'Road Repair', nameHi: 'सड़क की मरम्मत' },
  { id: '6', name: 'Other', nameHi: 'अन्य' },
];

export const mockUsers: User[] = [
  {
    id: '1',
    phoneNumber: '9876543210',
    name: 'Rajesh Kumar',
    district: 'Mumbai',
    block: 'Block A',
    language: 'en'
  }
];

export const mockAdmins: Admin[] = [
  {
    id: '1',
    username: 'pothole_admin',
    role: 'category',
    district: 'Mumbai',
    block: 'Block A',
    category: 'Pothole',
    name: 'Pothole Officer'
  },
  {
    id: '2',
    username: 'block_admin_a',
    role: 'block',
    district: 'Mumbai',
    block: 'Block A',
    name: 'Block A Administrator'
  },
  {
    id: '3',
    username: 'district_mumbai',
    role: 'district',
    district: 'Mumbai',
    name: 'Mumbai District Collector'
  },
  {
    id: '4',
    username: 'super_admin',
    role: 'super',
    name: 'System Administrator'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    userId: '1',
    district: 'Mumbai',
    block: 'Block A',
    category: 'Pothole',
    description: 'Large pothole near the main market causing traffic issues',
    location: {
      type: 'manual',
      address: 'Main Market Road, Block A, Mumbai'
    },
    status: 'pending',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    district: 'Mumbai',
    block: 'Block A',
    category: 'Streetlight',
    description: 'Street light not working for 3 days',
    location: {
      type: 'gps',
      address: 'Gandhi Road, Block A, Mumbai',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    status: 'in-progress',
    createdAt: '2024-01-14T14:20:00Z',
    updatedAt: '2024-01-16T09:15:00Z',
    assignedTo: '1'
  }
];