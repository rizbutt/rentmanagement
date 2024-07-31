"use client";
import { useState } from 'react';
// import OwnedPropertyDetails from '../OwnedPropertyDetail/page';
// import RentedPropertyDetails from '../RentedPropertyDetail/page';


const PropertyTypeSelection = () => {
  const [propertyType, setPropertyType] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(event.target.value);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Property Details</h2>
      <p className="mb-4 text-gray-600">Please provide more details about your property.</p>
      <form>
        <div className="mb-4">
          <label htmlFor="property-type" className="block text-sm font-medium text-gray-700">
          Select Property Type:
          </label>
          <select
            id="property-type"
            name="propertyType"
            value={propertyType}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select one ..</option>
            <option value="owned">Owned</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        {propertyType === 'owned' && (
          <div id="owned-details" className="mt-4">
            {/* Additional fields for owned properties */}
           {/* < OwnedPropertyDetails/> */}

          </div>
        )}




        {propertyType === 'rented' && (
          <div id="rented-details" className="mt-4">
            {/* Additional fields for rented properties */}

            {/* <RentedPropertyDetails /> */}
          </div>
        )}

        <button
          type="submit"
          className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default PropertyTypeSelection;
