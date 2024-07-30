"use client"
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error message when user starts typing
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/register', formData);
      console.log('Registered:', response.data);
      // Optionally, you can reset the form here
      router.push('/components/login')
      setFormData({ email: '', password: '', confirmPassword: '' });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error registering:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '', confirmPassword: '' };

    if (!formData.email || !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      valid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email: string) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 pl-10 border border-gray-600 rounded bg-gray-700 text-white ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            <FontAwesomeIcon icon={faEnvelope} className="absolute inset-y-0 left-0 pl-3  mt-4 flex items-center text-gray-400" />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Password</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 pl-10 border border-gray-600 rounded bg-gray-700 text-white ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            <FontAwesomeIcon icon={faLock} className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
              {errors.password}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Confirm Password</label>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 pl-10 border border-gray-600 rounded bg-gray-700 text-white ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            <FontAwesomeIcon icon={faCheckCircle} className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">Register</button>
        <p className="mt-2 text-sm text-gray-300 text-center">
          {`Already have an account? `}
          <button type="button" onClick={() => router.push('/components/login')} className="text-blue-500 hover:text-white">
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
}
