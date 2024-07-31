"use client";

import React, { useState } from 'react';

interface BuildingDetailsProps {
  onSubmit: (details: BuildingDetailsState) => void;
  onFormSubmit: () => void; // New prop for submitting the entire form
}

interface BuildingDetailsState {
  rooms: number | '';
  kitchens: number | '';
  lobbies: number | '';
  bathrooms: number | '';
  additionalFeatures: string;
}

const BuildingDetails: React.FC<BuildingDetailsProps> = ({ onSubmit, onFormSubmit }) => {
  const [details, setDetails] = useState<BuildingDetailsState>({
    rooms: '',
    kitchens: '',
    lobbies: '',
    bathrooms: '',
    additionalFeatures: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === 'additionalFeatures' ? value : parseInt(value) || '',
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(details);
    onFormSubmit(); // Call the function to submit the entire form
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Building Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rooms" className="block text-sm font-medium text-gray-700">
            Number of Rooms:
          </label>
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={details.rooms}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Enter number of rooms"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="kitchens" className="block text-sm font-medium text-gray-700">
            Number of Kitchens:
          </label>
          <input
            type="number"
            id="kitchens"
            name="kitchens"
            value={details.kitchens}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Enter number of kitchens"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="lobbies" className="block text-sm font-medium text-gray-700">
            Number of Lobbies:
          </label>
          <input
            type="number"
            id="lobbies"
            name="lobbies"
            value={details.lobbies}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Enter number of lobbies"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
            Number of Bathrooms:
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={details.bathrooms}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Enter number of bathrooms"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="additionalFeatures" className="block text-sm font-medium text-gray-700">
            Additional Features (if any):
          </label>
          <textarea
            id="additionalFeatures"
            name="additionalFeatures"
            value={details.additionalFeatures}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Enter additional features..."
          ></textarea>
        </div>

        {/* <button
          type="submit"
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button> */}
      </form>
    </div>
  );
};

export default BuildingDetails;
