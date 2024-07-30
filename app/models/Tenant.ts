import mongoose, { Schema, Document } from 'mongoose';

export interface ITenant extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  propertyId: mongoose.Types.ObjectId;
}

const TenantSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  propertyId: { type: mongoose.Types.ObjectId, ref: 'Property', required: true },
});

export default mongoose.models.Tenant || mongoose.model<ITenant>('Tenant', TenantSchema);
