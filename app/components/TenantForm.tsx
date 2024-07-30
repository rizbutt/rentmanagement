import React, { useState, useEffect } from 'react';
import BaseForm from './BaseForm';
import axiosInstance from '../utils/axiosInstance';
import { faUser, faEnvelope, faPhone, faBuilding } from '@fortawesome/free-solid-svg-icons';
import mongoose from 'mongoose';

interface TenantFormProps {
  onClose: () => void;
  action: 'create' | 'update' | 'delete';
}

interface Tenant {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  propertyId: mongoose.Types.ObjectId;
}

/**
 * TenantForm component for managing tenants.
 */
const TenantForm: React.FC<TenantFormProps> = ({ onClose, action }) => {
  const initialValues = {
    name: '',
    email: '',
    phoneNumber: '',
    propertyId: '',
  };

  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<{ _id: string; name: string }[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<string | undefined>(undefined);

  const fields = [
    { name: 'name', label: 'Name', type: 'text', icon: faUser },
    { name: 'email', label: 'Email', type: 'email', icon: faEnvelope },
    { name: 'phoneNumber', label: 'Phone Number', type: 'text', icon: faPhone },
    { name: 'propertyId', label: 'Property', type: 'select', options: properties.map(property => ({ value: property._id, label: property.name })), icon: faBuilding },
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

    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('/api/property');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchTenants();
    fetchProperties();
  }, []);

  const onSubmit = async (values: Record<string, any>) => {
    try {
      let response:any;
      if (action === 'create') {
        response = await axiosInstance.post('/api/tenant', values);
      } else if (action === 'update') {
        response = await axiosInstance.put(`/api/tenant?tenantId=${selectedTenant}`, values);
      } else if (action === 'delete') {
        response = await axiosInstance.delete(`/api/tenant?tenantId=${selectedTenant}`);
      }
      console.log('Tenant Data:', response.data);
      onClose(); // Close the modal on successful submission
    } catch (error) {
      console.error('Error submitting tenant data:', error);
    }
  };

  const validate = (values: Record<string, any>) => {
    const errors: Record<string, string> = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.email) errors.email = 'Email is required';
    if (!values.phoneNumber) errors.phoneNumber = 'Phone Number is required';
    if (!values.propertyId) errors.propertyId = 'Property is required';
    return errors;
  };

  return (
    <>
      {action === 'update' || action === 'delete' ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Select Tenant</label>
          <select
            value={selectedTenant}
            onChange={(e) => setSelectedTenant(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          >
            <option value="">Select a tenant</option>
            {tenants.map((tenant: Tenant) => (
              <option key={tenant._id} value={tenant._id}>
                {tenant.name}
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

export default TenantForm;
