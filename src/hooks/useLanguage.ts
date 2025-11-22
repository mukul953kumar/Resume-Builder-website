import { useState, useEffect } from 'react';
import { Language } from '../types';

const translations = {
  en: {
    // Common
    login: 'Login',
    submit: 'Submit',
    cancel: 'Cancel',
    back: 'Back',
    next: 'Next',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...',
    
    // Navigation
    dashboard: 'Dashboard',
    profile: 'Profile',
    logout: 'Logout',
    home: 'Home',
    
    // User Module
    phoneNumber: 'Phone Number',
    district: 'District',
    block: 'Block',
    selectDistrict: 'Select District',
    selectBlock: 'Select Block',
    
    // Issue Reporting
    reportIssue: 'Report Issue',
    category: 'Category',
    selectCategory: 'Select Category',
    problemDescription: 'Problem Description',
    location: 'Location',
    manualLocation: 'Manual Location',
    useGPS: 'Use GPS',
    uploadImage: 'Upload Image',
    
    // Status
    pending: 'Pending',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    
    // Admin
    adminLogin: 'Admin Login',
    username: 'Username',
    role: 'Role',
    selectRole: 'Select Role',
    secretPassword: 'Secret Password',
    
    // Categories
    pothole: 'Pothole',
    streetlight: 'Streetlight',
    waterSupply: 'Water Supply',
    garbageCollection: 'Garbage Collection',
    roadRepair: 'Road Repair',
    other: 'Other',
    
    // Messages
    issueSubmitted: 'Issue submitted successfully!',
    loginSuccess: 'Login successful!',
    invalidCredentials: 'Invalid credentials',
    fillAllFields: 'Please fill all required fields',
  },
  hi: {
    // Common
    login: 'लॉगिन',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    back: 'वापस',
    next: 'आगे',
    save: 'सहेजें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    loading: 'लोड हो रहा है...',
    
    // Navigation
    dashboard: 'डैशबोर्ड',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    home: 'होम',
    
    // User Module
    phoneNumber: 'फोन नंबर',
    district: 'जिला',
    block: 'ब्लॉक',
    selectDistrict: 'जिला चुनें',
    selectBlock: 'ब्लॉक चुनें',
    
    // Issue Reporting
    reportIssue: 'समस्या दर्ज करें',
    category: 'श्रेणी',
    selectCategory: 'श्रेणी चुनें',
    problemDescription: 'समस्या का विवरण',
    location: 'स्थान',
    manualLocation: 'मैन्युअल स्थान',
    useGPS: 'GPS का उपयोग करें',
    uploadImage: 'छवि अपलोड करें',
    
    // Status
    pending: 'लंबित',
    inProgress: 'प्रगति में',
    resolved: 'समाधान',
    
    // Admin
    adminLogin: 'व्यवस्थापक लॉगिन',
    username: 'उपयोगकर्ता नाम',
    role: 'भूमिका',
    selectRole: 'भूमिका चुनें',
    secretPassword: 'गुप्त पासवर्ड',
    
    // Categories
    pothole: 'गड्ढा',
    streetlight: 'स्ट्रीट लाइट',
    waterSupply: 'पानी की आपूर्ति',
    garbageCollection: 'कचरा संग्रह',
    roadRepair: 'सड़क की मरम्मत',
    other: 'अन्य',
    
    // Messages
    issueSubmitted: 'समस्या सफलतापूर्वक दर्ज की गई!',
    loginSuccess: 'लॉगिन सफल!',
    invalidCredentials: 'अमान्य प्रमाणपत्र',
    fillAllFields: 'कृपया सभी आवश्यक फील्ड भरें',
  }
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return { language, setLanguage, t, toggleLanguage };
};