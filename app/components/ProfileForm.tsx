import React, { useState, useEffect } from 'react';
import BaseForm from './BaseForm';
import axiosInstance from '../utils/axiosInstance';
import { faImage, faBuilding, faMapMarkerAlt, faPhone, faKey } from '@fortawesome/free-solid-svg-icons';

interface ProfileFormProps {
  onClose: () => void;
  action: 'create' | 'update' | 'delete';
}

interface Profile {
  _id: string;
  logo: string;
  name: string;
  address: string;
  contact: string;
  keywords: string[];
}

/**
 * ProfileForm component for managing company profile information.
 */
const ProfileForm: React.FC<ProfileFormProps> = ({ onClose, action }) => {
  const initialValues = {
    logo: '',
    name: '',
    address: '',
    contact: '',
    keywords: '',
  };

  const [selectedProfile, setSelectedProfile] = useState<string | undefined>(undefined);
  const [formValues, setFormValues] = useState(initialValues);
  const [profiles, setProfiles] = useState<Profile[]>([]); // Initialize profiles as an empty array

  const fields = [
    { name: 'logo', label: 'Logo URL', type: 'text', icon: faImage },
    { name: 'name', label: 'Business Name', type: 'text', icon: faBuilding },
    { name: 'address', label: 'Address', type: 'text', icon: faMapMarkerAlt },
    { name: 'contact', label: 'Contact', type: 'text', icon: faPhone },
    { name: 'keywords', label: 'Keywords (comma separated)', type: 'text', icon: faKey },
  ];

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axiosInstance.get('/api/profile');
        setProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const onSubmit = async (values: Record<string, any>) => {
    try {
      let response: any;
      const processedKeywords = values.keywords.split(',').map((keyword: string) => keyword.trim()).filter((keyword: string) => keyword !== '');
      values.keywords = processedKeywords;

      if (action === 'create') {
        response = await axiosInstance.post('/api/profile', values);
      } else if (action === 'update') {
        response = await axiosInstance.put(`/api/profile?id=${selectedProfile}`, values);
      } else if (action === 'delete') {
        response = await axiosInstance.delete(`/api/profile?id=${selectedProfile}`);
      }
      console.log('Profile Data:', response.data);
      onClose(); // Close the modal on successful submission
    } catch (error) {
      console.error('Error submitting profile data:', error);
    }
  };

  const validate = (values: Record<string, any>) => {
    const errors: Record<string, string> = {};
    if (!values.logo) errors.logo = 'Logo URL is required';
    if (!values.name) errors.name = 'Business Name is required';
    if (!values.address) errors.address = 'Address is required';
    if (!values.contact) errors.contact = 'Contact is required';
    if (!values.keywords) errors.keywords = 'Keywords are required';
    return errors;
  };

  const handleProfileSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedProfile(selectedId);

    if (action === 'update' && selectedId) {
      const profile = profiles.find(p => p._id === selectedId);
      if (profile) {
        // Populate the form with the selected profile data
        setFormValues({
          logo: profile.logo,
          name: profile.name,
          address: profile.address,
          contact: profile.contact,
          keywords: profile.keywords.join(', '),
        });
      }
    }
  };

  return (
    <>
      {action === 'update' || action === 'delete' ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Select Profile</label>
          <select
            value={selectedProfile}
            onChange={handleProfileSelect}
            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
          >
            <option value="">Select a profile</option>
            {profiles.length > 0 ? (
              profiles.map((profile: Profile) => (
                <option key={profile._id} value={profile._id}>
                  {profile.name}
                </option>
              ))
            ) : (
              <option disabled>No profiles available</option>
            )}
          </select>
        </div>
      ) : null}
      {action !== 'delete' ? (
        <BaseForm
          initialValues={formValues}
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

export default ProfileForm;
