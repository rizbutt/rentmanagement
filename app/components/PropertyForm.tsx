import React, { useState, useEffect } from 'react';
import BaseForm from './BaseForm';
import axiosInstance from '../utils/axiosInstance';
import { faBuilding, faAddressCard, faSitemap } from '@fortawesome/free-solid-svg-icons';

interface PropertyFormProps {
  onClose: () => void;
  action: 'create' | 'update' | 'delete';
}

interface Property {
  _id: string;
  name: string;
  address: string;
  section: string;
}

/**
 * PropertyForm component for managing properties.
 */
const PropertyForm: React.FC<PropertyFormProps> = ({ onClose, action }) => {
  const initialValues = {
    name: '',
    address: '',
    section: '',
  };

  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string | undefined>(undefined);

  const fields = [
    { name: 'name', label: 'Name', type: 'text', icon: faBuilding },
    { name: 'address', label: 'Address', type: 'text', icon: faAddressCard },
    { name: 'section', label: 'Section', type: 'text', icon: faSitemap },
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axiosInstance.get('/api/property');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const onSubmit = async (values: Record<string, any>) => {
    try {
      let response: any;
      if (action === 'create') {
        response = await axiosInstance.post('/api/property', values);
      } else if (action === 'update') {
        response = await axiosInstance.put(`/api/property?id=${selectedProperty}`, values);
      } else if (action === 'delete') {
        response = await axiosInstance.delete(`/api/property?id=${selectedProperty}`);
      }
      console.log('Property Data:', response.data);
      onClose(); // Close the modal on successful submission
    } catch (error) {
      console.error('Error submitting property data:', error);
    }
  };

  const validate = (values: Record<string, any>) => {
    const errors: Record<string, string> = {};
    if (!values.name) errors.name = 'Name is required';
    if (!values.address) errors.address = 'Address is required';
    if (!values.section) errors.section = 'Section is required';
    return errors;
  };

  return (
    <>
      {action === 'update' || action === 'delete' ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Select Property</label>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          >
            <option value="">Select a property</option>
            {properties.map((property: Property) => (
              <option key={property._id} value={property._id}>
                {property.name}
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

export default PropertyForm;
