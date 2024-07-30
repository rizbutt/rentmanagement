import mongoose, { Schema, Document } from 'mongoose';

export interface ICompanyProfile extends Document {
  logo: string;
  businessDetails: {
    name: string;
    address: string;
    contact: string;
  };
  keywords: string[];
}

const CompanyProfileSchema: Schema = new Schema({
  logo: { type: String, required: true },
  businessDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
  },
  keywords: { type: [String], required: true },
});

export default mongoose.models.CompanyProfile || mongoose.model<ICompanyProfile>('CompanyProfile', CompanyProfileSchema);
