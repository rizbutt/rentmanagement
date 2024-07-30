import React, { useState, useEffect } from 'react';
import BaseForm from './BaseForm';
import axiosInstance from '../utils/axiosInstance';
import { faUser, faDollarSign, faCalendarAlt, faUniversity } from '@fortawesome/free-solid-svg-icons';

interface RentFormProps {
  onClose: () => void;
  action: 'create' | 'update' | 'delete';
}

interface Tenant {
  _id: string;
  name: string;
}

interface Lease {
  _id: string;
  tenantId: string;
  tenantName?: string; // Added tenantName to store tenant's name
  paidAmount: number;
}

/**
 * RentForm component for managing rent information.
 */
const RentForm: React.FC<RentFormProps> = ({ onClose, action }) => {
  const initialValues = {
    tenantId: '',
    paidAmount: 0,
    rentAmount: 0,
    startDate: '',
    dues: 0,
    payBank: '',
  };

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedLease, setSelectedLease] = useState<string | undefined>(undefined);
  const [leases, setLeases] = useState<Lease[]>([]); // Store fetched leases

  const fields = [
    { name: 'tenantId', label: 'Tenant', type: 'select', options: tenants.map(t => ({ value: t._id, label: t.name })), icon: faUser },
    { name: 'paidAmount', label: 'Paid Amount', type: 'number', icon: faDollarSign },
    { name: 'rentAmount', label: 'Rent Amount', type: 'number', icon: faDollarSign },
    { name: 'startDate', label: 'Start Date', type: 'date', icon: faCalendarAlt },
    { name: 'dues', label: 'Dues', type: 'number', icon: faDollarSign },
    { name: 'payBank', label: 'Payment Bank', type: 'text', icon: faUniversity },
  ];

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axiosInstance.get('/api/tenant');
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };

    const fetchLeases = async () => {
      try {
        const response = await axiosInstance.get('/api/rent');
        const leasesData = response.data;

        // Fetch tenant names and map them to leases
        const tenantMap: { [key: string]: string } = {};
        const tenantsResponse = await axiosInstance.get('/api/tenant');
        tenantsResponse.data.forEach((tenant: Tenant) => {
          tenantMap[tenant._id] = tenant.name;
        });

        const leasesWithTenantNames = leasesData.map((lease: Lease) => ({
          ...lease,
          tenantName: tenantMap[lease.tenantId],
        }));

        setLeases(leasesWithTenantNames);
      } catch (error) {
        console.error('Error fetching leases:', error);
      }
    };

    fetchTenants();
    fetchLeases();
  }, []);

  const onSubmit = async (values: Record<string, any>) => {
    try {
      let response: any;
      if (action === 'create') {
        response = await axiosInstance.post('/api/rent', values);
      } else if (action === 'update') {
        response = await axiosInstance.put(`/api/rent?id=${selectedLease}`, values);
      } else if (action === 'delete') {
        response = await axiosInstance.delete(`/api/rent?id=${selectedLease}`);
      }
      console.log('Rent Data:', response.data);
      onClose(); // Close the modal on successful submission
    } catch (error) {
      console.error('Error submitting rent data:', error);
    }
  };

  const validate = (values: Record<string, any>) => {
    const errors: Record<string, string> = {};
    if (!values.tenantId) errors.tenantId = 'Tenant is required';
    if (!values.paidAmount) errors.paidAmount = 'Paid Amount is required';
    if (!values.rentAmount) errors.rentAmount = 'Rent Amount is required';
    if (!values.startDate) errors.startDate = 'Start Date is required';
    if (!values.dues) errors.dues = 'Dues are required';
    if (!values.payBank) errors.payBank = 'Payment Bank is required';
    return errors;
  };

  return (
    <>
      {action === 'update' || action === 'delete' ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Select Lease</label>
          <select
            value={selectedLease}
            onChange={(e) => setSelectedLease(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          >
            <option value="">Select a lease</option>
            {leases.map((lease) => (
              <option key={lease._id} value={lease._id}>
                {lease.tenantName} - {lease.paidAmount}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      {action !== 'delete' ? (
        <BaseForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
          fields={fields}
        />
      ) : (
        <button
          onClick={() => onSubmit({})}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-150"
        >
          Confirm Delete
        </button>
      )}
    </>
  );
};

export default RentForm;
