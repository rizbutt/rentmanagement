import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faSun, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import axiosInstance from '../utils/axiosInstance';

interface NavbarProps {
  onSelect: (form: string) => void;
  toggleDarkMode: () => void;
}

/**
 * Navbar component with company profile and user actions.
 */
const Navbar: React.FC<NavbarProps> = ({ onSelect, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<any>(null);
  const router = useRouter();

  // Fetch company profile on component mount
  useEffect(() => {
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

    fetchCompanyProfile();
  }, []);

  // Toggle the menu open and close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/components/login');
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Display the company logo and name */}
          {companyProfile && (
            <>
              <img src={companyProfile.logo} alt="Business Logo" className="h-14 w-24 object-cover rounded-full" />
              <h1 className="text-3xl font-bold ml-4">{companyProfile.businessDetails?.name || 'Property Management'}</h1>
            </>
          )}
        </div>
        <div className="flex items-center">
          {/* Toggle dark mode button */}
          <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-700 transition">
            <FontAwesomeIcon icon={faSun} />
          </button>
          {/* Menu toggle button */}
          <button onClick={toggleMenu} className="ml-4 p-2 rounded-lg hover:bg-gray-700 transition">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="absolute top-16 right-0 bg-gray-800 text-white shadow-md w-48 z-50 rounded-lg">
          <ul className="flex flex-col space-y-4 p-4">
            {/* Company profile menu item */}
            <li>
              <a onClick={() => onSelect('profile')} className="flex items-center justify-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                <FontAwesomeIcon icon={faUser} />
                <span>Company Profile</span>
              </a>
            </li>
            {/* Logout menu item */}
            <li>
              <a onClick={handleLogout} className="flex items-center justify-center space-x-2 mr-16 p-2 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
