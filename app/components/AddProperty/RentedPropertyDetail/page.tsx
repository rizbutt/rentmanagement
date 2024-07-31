"use client";
import React, { useState } from 'react';

interface RentedPropertyDetailsProps {
  onRentAgreementChange: (file: File) => void;
  onRentAmountChange: (amount: number) => void;
  onRentTenureChange: (tenure: number) => void;
  onRentStartDateChange: (date: string) => void;
}

const RentedPropertyDetails: React.FC<RentedPropertyDetailsProps> = ({
  onRentAgreementChange,
  onRentAmountChange,
  onRentTenureChange,
  onRentStartDateChange,
}) => {
  const [rentAgreement, setRentAgreement] = useState<File | null>(null);
  const [rentAmount, setRentAmount] = useState<number | ''>('');
  const [rentTenure, setRentTenure] = useState<number | ''>('');
  const [rentStartDate, setRentStartDate] = useState<string>('');

  const handleRentAgreementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setRentAgreement(file);
      onRentAgreementChange(file);
    }
  };

  const handleRentAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value);
    setRentAmount(amount);
    onRentAmountChange(amount);
  };

  const handleRentTenureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tenure = parseInt(event.target.value, 10);
    setRentTenure(tenure);
    onRentTenureChange(tenure);
  };

  const handleRentStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setRentStartDate(date);
    onRentStartDateChange(date);
  };

  return (
    <div className="mt-4">
      <div className="mb-4">
        <label htmlFor="rent-agreement" className="block text-sm font-medium text-gray-700">
          Upload Rent Agreement:
        </label>
        <input
          type="file"
          id="rent-agreement"
          name="rentAgreement"
          onChange={handleRentAgreementChange}
          className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rent-amount" className="block text-sm font-medium text-gray-700">
          Rent Amount:
        </label>
        <input
          type="number"
          id="rent-amount"
          name="rentAmount"
          value={rentAmount}
          onChange={handleRentAmountChange}
          className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          placeholder="Enter rent amount"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rent-tenure" className="block text-sm font-medium text-gray-700">
          Rent Tenure (months):
        </label>
        <input
          type="number"
          id="rent-tenure"
          name="rentTenure"
          value={rentTenure}
          onChange={handleRentTenureChange}
          className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          placeholder="Enter rent tenure in months"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rent-start-date" className="block text-sm font-medium text-gray-700">
          Rent Start Date:
        </label>
        <input
          type="date"
          id="rent-start-date"
          name="rentStartDate"
          value={rentStartDate}
          onChange={handleRentStartDateChange}
          className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </div>
    </div>
  );
};

export default RentedPropertyDetails;
