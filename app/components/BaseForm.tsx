import React from 'react';
import { useForm } from './useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faHome, faImage, faBuilding, faMapMarkerAlt, faPhone, faKey, faUser, faEnvelope, faDollarSign, faUniversity, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface BaseFormProps {
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  validate?: (values: Record<string, any>) => Record<string, string>;
  fields: { name: string; label: string; type: string; icon?: IconDefinition; options?: { value: string; label: string }[] }[];
}

/**
 * BaseForm component for rendering forms with dynamic fields.
 */
const BaseForm: React.FC<BaseFormProps> = ({ initialValues, onSubmit, validate, fields }) => {
  const { values, errors, handleChange, handleSubmit } = useForm({ initialValues, onSubmit, validate });

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded shadow-md overflow-y-auto" style={{ maxHeight: '80vh' }}>
      {fields.map(field => (
        <div className="mb-4" key={field.name}>
          <label className="block text-sm font-medium text-gray-300">{field.label}</label>
          <div className="relative">
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={values[field.name]}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 pl-10 border border-gray-600 rounded bg-gray-700 text-white ${
                  errors[field.name] ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select an option</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={values[field.name]}
                onChange={handleChange}
                className={`mt-1 block w-full p-2 pl-10 border border-gray-600 rounded bg-gray-700 text-white ${
                  errors[field.name] ? 'border-red-500' : ''
                }`}
              />
            )}
            {field.icon && (
              <FontAwesomeIcon icon={field.icon} className="absolute inset-y-0 left-0 mt-4 pl-3 flex items-center text-gray-400" />
            )}
            {errors[field.name] && (
              <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
            )}
          </div>
        </div>
      ))}
      <button type="submit" className="w-full px-4 py-2 bg-gray-300 text-black rounded">Submit</button>
    </form>
  );
};

export default BaseForm;
