import mongoose, { Document } from "mongoose";


// Main Property Interface
export interface IProperty extends Document {
  propertyNo: string;
  ownerName: string;
  property_type: 'Villa' | 'Building' | 'Commercial';
  address: string;
  contractDuration: {
    from: Date;
    to: Date;
  };
  totalRent: number;
  rentInstalments: [{
    dueDate: Date;
    amount: number;
}];
  billsToPay?: boolean;
  paymentMethod?: 'Cash' | 'Cheque';
  billsAccounts?: [
    {
      type?: string; // e.g., water/gas/electric
      accountNo?: string;
    }
  ];
  ownership_type: 'Owned' | 'Rented';
  user_document?: {
    data: Buffer; // Binary data for the file
    contentType: string; // MIME type of the file
  };
  building_images?: [{
    path: string; // Path to the image file
    description?: string; // Optional description or metadata
  }]; // Array of building images
  rentDetails?: {
    rentAgreement: string; // Path to uploaded document
    rentAmount: number;
    rentTenure: number;
    rentStartDate: Date;
  };
  buildingDetails: {
    rooms: number;
    kitchens: number;
    lobbies: number;
    bathrooms: number;
    additionalFeatures?: string;
  };
  sections?: [{
    sectionName?: string; // Dynamically named by the user (e.g., "section1", "section2")
    sectionType?: 'Shared' | 'Single';
    rooms?: number;
    kitchens?: number;
    bathrooms?: number;
    rentAmount?: number;
  }]; // Array of dynamically named sections
  user_id: mongoose.Schema.Types.ObjectId; // Reference to the user model
  createdAt?: Date;
  updatedAt?: Date;
}
