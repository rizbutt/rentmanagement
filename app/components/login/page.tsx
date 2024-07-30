"use client"
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
    setErrors({ ...errors, [name]: '', general: '' }); // Clear error message when user starts typing
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axiosInstance.post('/api/auth/login', formData);
      console.log('Logged in:', response.data.token);
      
      // Redirect to a different page on successful login
      localStorage.setItem('token',response.data.token)
      router.push('/dashboard');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error logging in:', error.response?.data || error.message);
        setErrors({ ...errors, general: 'Invalid email or password.' });
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '', general: '' };

    if (!formData.email || !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email: string) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-gray-800 rounded shadow-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
        {errors.general && (
          <p className="text-red-500 text-center mb-4">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
            {errors.general}
          </p>
        )}
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
            <FontAwesomeIcon icon={faEnvelope} className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400" />
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
            <FontAwesomeIcon icon={faLock} className="absolute inset-y-0 left-0 mt-4 pl-3 flex items-center text-gray-400" />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
              {errors.password}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              id="rememberMe"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
              Remember me
            </label>
          </div>
          <button onClick={() => router.push('/forgot-password')} className="text-sm text-gray-300 hover:text-white">
            Forgot password?
          </button>
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">Login</button>
        <p className="mt-2 text-sm text-gray-300 text-center">
          {`Don't have an account? `}
          <button onClick={() => router.push('/components/register')} className="text-blue-500 hover:text-white">
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
