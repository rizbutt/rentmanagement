"use client";
import React, { useState } from 'react';
import OwnedPropertyDetails from '../OwnedPropertyDetail/page';
import RentedPropertyDetails from '../RentedPropertyDetail/page';
import BuildingDetails from '../BuildingDetail/page';
import PropertyDivision from '../PropertyDevision/page';

interface BuildingDetailsState {
  rooms: number | '';
  kitchens: number | '';
  lobbies: number | '';
  bathrooms: number | '';
  additionalFeatures: string;
}

interface Section {
  id: number;
  rooms: number | '';
  kitchens: number | '';
  bathrooms: number | '';
  rentAmount: number | '';
  sectionType: string;
}

interface FinalizedState {
  propertyType: string;
  ownerSheet: File | null;
  additionalOwnerDetails: string;
  rentAgreement: File | null;
  rentAmount: number | '';
  rentTenure: number | '';
  rentStartDate: string;
  buildingDetails: BuildingDetailsState;
  sections: Section[];
}

const Finalized: React.FC = () => {
  const [formState, setFormState] = useState<FinalizedState>({
    propertyType: '',
    ownerSheet: null,
    additionalOwnerDetails: '',
    rentAgreement: null,
    rentAmount: '',
    rentTenure: '',
    rentStartDate: '',
    buildingDetails: {
      rooms: '',
      kitchens: '',
      lobbies: '',
      bathrooms: '',
      additionalFeatures: '',
    },
    sections: [],
  });

  const handlePropertyTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormState({ ...formState, propertyType: event.target.value });
  };

  const handleOwnerSheetChange = (file: File) => {
    setFormState({ ...formState, ownerSheet: file });
  };

  const handleAdditionalOwnerDetailsChange = (details: string) => {
    setFormState({ ...formState, additionalOwnerDetails: details });
  };

  const handleRentAgreementChange = (file: File) => {
    setFormState({ ...formState, rentAgreement: file });
  };

  const handleRentAmountChange = (amount: number) => {
    setFormState({ ...formState, rentAmount: amount });
  };

  const handleRentTenureChange = (tenure: number) => {
    setFormState({ ...formState, rentTenure: tenure });
  };

  const handleRentStartDateChange = (date: string) => {
    setFormState({ ...formState, rentStartDate: date });
  };

  const handleBuildingDetailsChange = (details: BuildingDetailsState) => {
    setFormState({ ...formState, buildingDetails: details });
  };

  const handleSectionsChange = (sections: Section[]) => {
    setFormState({ ...formState, sections });
  };

  const handleFormSubmit = () => {
    console.log('Finalized Form Submission:', formState);
    // Perform form submission logic, such as sending data to a server
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Property Details Form</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">
            Select Property Type:
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formState.propertyType}
            onChange={handlePropertyTypeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="" disabled>Select property type</option>
            <option value="owned">Owned</option>
            <option value="rented">Rented</option>
          </select>
        </div>

        {formState.propertyType === 'owned' && (
          <OwnedPropertyDetails
            onOwnerSheetChange={handleOwnerSheetChange}
            onAdditionalDetailsChange={handleAdditionalOwnerDetailsChange}
          />
        )}

        {formState.propertyType === 'rented' && (
          <RentedPropertyDetails
            onRentAgreementChange={handleRentAgreementChange}
            onRentAmountChange={handleRentAmountChange}
            onRentTenureChange={handleRentTenureChange}
            onRentStartDateChange={handleRentStartDateChange}
          />
        )}

        <BuildingDetails
          onSubmit={handleBuildingDetailsChange}
          onFormSubmit={handleFormSubmit}
        />

        <PropertyDivision onSubmit={handleSectionsChange} />

        <button
          type="button"
          className="mt-6 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleFormSubmit}
        >
          Submit All Details
        </button>
      </form>
    </div>
  );
};

export default Finalized;
