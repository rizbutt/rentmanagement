import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isDarkMode: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, isDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-6 rounded-lg shadow-lg max-w-md w-full relative ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition absolute top-4 right-4">
          &times;
        </button>
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
