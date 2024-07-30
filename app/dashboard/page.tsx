"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import ProfileForm from '../components/ProfileForm';
import PropertyForm from '../components/PropertyForm';
import TenantForm from '../components/TenantForm';
import RentForm from '../components/RentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faDollarSign, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../utils/axiosInstance';
import "../globals.css";
import withAuth from '../utils/withAuth';

const Dashboard = () => {
  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<any>(null); // Store only the latest profile
  const [tenants, setTenants] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [rents, setRents] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSelectForm = (form: string) => {
    setSelectedForm(form);
    setSelectedAction(null);
    setIsModalOpen(true);
  };

  const handleSelectAction = (action: string) => {
    setSelectedAction(action);
  };

  // Function to format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const renderForm = () => {
    const onClose = () => {
      setIsModalOpen(false);
      fetchAllData(); // Re-fetch data to ensure the latest data is shown
    };

    if (!selectedAction) {
      return (
        <div className="flex flex-col items-center">
          <button onClick={() => handleSelectAction('create')} className="px-4 py-2 bg-green-500 text-white rounded-lg m-2">Create</button>
          <button onClick={() => handleSelectAction('update')} className="px-4 py-2 bg-yellow-500 text-white rounded-lg m-2">Update</button>
          <button onClick={() => handleSelectAction('delete')} className="px-4 py-2 bg-red-500 text-white rounded-lg m-2">Delete</button>
        </div>
      );
    }

    switch (selectedForm) {
      case 'profile':
        return <ProfileForm onClose={onClose} action={selectedAction} />;
      case 'property':
        return <PropertyForm onClose={onClose} action={selectedAction} />;
      case 'tenant':
        return <TenantForm onClose={onClose} action={selectedAction} />;
      case 'rent':
        return <RentForm onClose={onClose} action={selectedAction} />;
      default:
        return null;
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const fetchCompanyProfile = async () => {
    try {
      const response = await axiosInstance.get('/api/profile');
      if (response.data.length > 0) {
        setCompanyProfile(response.data[response.data.length - 1]);
      }
    } catch (error) {
      console.error('Error fetching company profile:', error);
    }
  };

  const fetchTenants = async () => {
    try {
      const response = await axiosInstance.get('/api/tenant');
      setTenants(response.data);
    } catch (error) {
      console.error('Error fetching tenants:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await axiosInstance.get('/api/property');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchRents = async () => {
    try {
      const response = await axiosInstance.get('/api/rent');
      setRents(response.data);
    } catch (error) {
      console.error('Error fetching rents:', error);
    }
  };

  const fetchAllData = async () => {
    await Promise.all([fetchCompanyProfile(), fetchTenants(), fetchProperties(), fetchRents()]);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tenants.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedTenants = tenants.slice(startIndex, startIndex + itemsPerPage);

  const mergeData = () => {
    return selectedTenants.map((tenant) => {
      const rent = rents.find((r) => r.tenantId === tenant._id);
      const property = properties.find((p) => p._id === tenant.propertyId);

      return {
        ...tenant,
        propertyName: property ? property.name : 'N/A',
        propertySection: property ? property.section : 'N/A',
        startDate: rent ? formatDate(rent.startDate) : 'N/A',
        paidAmount: rent ? rent.paidAmount : 'N/A',
        dues: rent ? rent.dues : 'N/A',
        payBank: rent ? rent.payBank : 'N/A',
      };
    });
  };

  const mergedData = mergeData();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-all duration-300`}>
      <Navbar onSelect={handleSelectForm} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto p-8">
        <h3 className="text-3xl font-bold mt-12">Business Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8">
          {companyProfile ? (
            <div className="space-y-4">
              <p>
                <strong>Business Name:</strong> {companyProfile.name || 'N/A'}
              </p>
              <p>
                <strong>Business Address:</strong> {companyProfile.address || 'N/A'}
              </p>
              <p>
                <strong>Business Contact:</strong> {companyProfile.contact || 'N/A'}
              </p>
              <p>
                <strong>Keywords:</strong> {companyProfile.keywords?.map((keyword: string) => (
                  <span key={keyword} className="text-blue-500">
                    {keyword}{' '}
                  </span>
                ))}
              </p>
            </div>
          ) : (
            <p>No company profile available.</p>
          )}
          <div>
            <img src="/propertpic.png" alt="Business" className="rounded-xl shadow-lg transition-transform transform hover:scale-105" />
          </div>
        </div>

        <h3 className="text-3xl font-bold mb-4 text-center">Tenants Listing</h3>
        <div className="overflow-x-auto mb-8">
          <table className={`min-w-full rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border border-gray-200 dark:border-gray-700`}>
            <thead className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} text-center`}>
              <tr>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-600">Name</th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-600">Email</th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-600">Phone Number</th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-600">Property Name</th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-600">Property Section</th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-600">Start Date</th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-600">Paid Amount</th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-600">Dues</th>
                <th className="px-6 py-3 border-b border-gray-300 dark:border-gray-600">Pay Bank</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {mergedData.map((tenant, index) => (
                <tr key={startIndex + index} className="dark:hover:bg-gray-700 transition duration-200">
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">{tenant.name}</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">{tenant.email}</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">{tenant.phoneNumber}</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">{tenant.propertyName}</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">{tenant.propertySection}</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">{tenant.startDate}</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">{tenant.paidAmount}</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">{tenant.dues}</td>
                  <td className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">{tenant.payBank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition duration-150`}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>
            Page {currentPage} of {Math.ceil(tenants.length / itemsPerPage)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(tenants.length / itemsPerPage)}
            className={`px-4 py-2 rounded-lg ${currentPage === Math.ceil(tenants.length / itemsPerPage) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition duration-150`}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
            <FontAwesomeIcon icon={faUsers} size="2x" className="text-blue-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Tenants</h3>
            <p className="mb-4 text-gray-300">Manage all tenant information</p>
            <button onClick={() => handleSelectForm('tenant')} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-150">Manage Tenants</button>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
            <FontAwesomeIcon icon={faDollarSign} size="2x" className="text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Rent</h3>
            <p className="mb-4 text-gray-300">Manage rent collection and dues</p>
            <button onClick={() => handleSelectForm('rent')} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-150">Manage Rent</button>
          </div>
          <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
            <FontAwesomeIcon icon={faBuilding} size="2x" className="text-yellow-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Properties</h3>
            <p className="mb-4 text-gray-300">Add, amend, and divide properties</p>
            <button onClick={() => handleSelectForm('property')} className="px-4 py-2 bg-yellow-600 text-white rounded-lg shadow-md hover:bg-yellow-700 transition duration-150">Manage Properties</button>
          </div>
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isDarkMode={isDarkMode}>
        {renderForm()}
      </Modal>
    </div>
  );
};

export default withAuth(Dashboard);
