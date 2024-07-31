"use client";
import React, { useState } from 'react';

interface Section {
  id: number;
  rooms: number | '';
  kitchens: number | '';
  bathrooms: number | '';
  rentAmount: number | '';
  sectionType: string;
  isShared: boolean;
}

interface PropertyDivisionProps {
  onSubmit: (sections: Section[]) => void;
}

const PropertyDivision: React.FC<PropertyDivisionProps> = ({ onSubmit }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isDividing, setIsDividing] = useState<boolean>(false);

  const addSection = () => {
    setSections([...sections, {
      id: sections.length + 1,
      rooms: '',
      kitchens: '',
      bathrooms: '',
      rentAmount: '',
      sectionType: 'Single',
      isShared: false
    }]);
  };

  const handleSectionChange = (id: number, field: string, value: string | number | boolean) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(sections);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Property Division</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Do you want to divide the property into sections?</label>
        <div className="flex items-center mt-2">
          <button
            type="button"
            className={`px-4 py-2 border ${isDividing ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} rounded-md`}
            onClick={() => setIsDividing(true)}
          >
            Yes
          </button>
          <button
            type="button"
            className={`ml-2 px-4 py-2 border ${!isDividing ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} rounded-md`}
            onClick={() => setIsDividing(false)}
          >
            No
          </button>
        </div>
      </div>

      {isDividing && (
        <form onSubmit={handleSubmit}>
          {sections.map(section => (
            <div key={section.id} className="mb-4 border p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">Section {section.id}</h3>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Number of Rooms</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                  value={section.rooms}
                  onChange={(e) => handleSectionChange(section.id, 'rooms', parseInt(e.target.value))}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Number of Kitchens</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                  value={section.kitchens}
                  onChange={(e) => handleSectionChange(section.id, 'kitchens', parseInt(e.target.value))}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Number of Bathrooms</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                  value={section.bathrooms}
                  onChange={(e) => handleSectionChange(section.id, 'bathrooms', parseInt(e.target.value))}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Rent Amount</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                  value={section.rentAmount}
                  onChange={(e) => handleSectionChange(section.id, 'rentAmount', parseInt(e.target.value))}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">Section Type</label>
                <select
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md"
                  value={section.sectionType}
                  onChange={(e) => handleSectionChange(section.id, 'sectionType', e.target.value)}
                >
                  <option value="Single">Single</option>
                  <option value="Shared">Shared</option>
                </select>
              </div>
              {section.sectionType === 'Shared' && (
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Is this section shared?</label>
                  <input
                    type="checkbox"
                    className="mt-1 block"
                    checked={section.isShared}
                    onChange={(e) => handleSectionChange(section.id, 'isShared', e.target.checked)}
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={addSection}
          >
            Add Section
          </button>
          <button
            type="submit"
            className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Sections
          </button>
        </form>
      )}
    </div>
  );
};

export default PropertyDivision;
