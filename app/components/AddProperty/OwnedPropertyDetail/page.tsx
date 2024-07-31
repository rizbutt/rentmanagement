"use client";
import React, { useState } from 'react';

interface OwnedPropertyDetailsProps {
  onOwnerSheetChange: (file: File) => void;
  onAdditionalDetailsChange: (details: string) => void;
}

const OwnedPropertyDetails: React.FC<OwnedPropertyDetailsProps> = ({
  onOwnerSheetChange,
  onAdditionalDetailsChange,
}) => {
  const [ownerSheet, setOwnerSheet] = useState<File | null>(null);
  const [additionalDetails, setAdditionalDetails] = useState<string>('');

  const handleOwnerSheetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setOwnerSheet(file);
      onOwnerSheetChange(file);
    }
  };

  const handleAdditionalDetailsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const details = event.target.value;
    setAdditionalDetails(details);
    onAdditionalDetailsChange(details);
  };

  return (
    <div className="mt-4">
      <div className="mb-4">
        <label htmlFor="owner-sheet" className="block text-sm font-medium text-gray-700">
          Upload Owner Sheet:
        </label>
        <input
          type="file"
          id="owner-sheet"
          name="ownerSheet"
          onChange={handleOwnerSheetChange}
          className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="additional-details" className="block text-sm font-medium text-gray-700">
          Additional Property Details:
        </label>
        <textarea
          id="additional-details"
          name="additionalDetails"
          value={additionalDetails}
          onChange={handleAdditionalDetailsChange}
          rows={4}
          className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          placeholder="Enter any additional details about the property..."
        ></textarea>
      </div>
    </div>
  );
};

export default OwnedPropertyDetails;
